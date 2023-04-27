import { connectMongo, disconnectMongo } from "../mongoHelper";
import mongoose from 'mongoose';
import { userSchema } from "../schemas/userSchema";
import { connectMySql, disconnectMySql, querySql } from "../mySqlHelper";
import { sqlToMongoUser } from "../mapper/userMapper";

// const MONGO_URI = `mongodb+srv://starun035:qwerty123@cluster0.xqvewgd.mongodb.net/?retryWrites=true/test`;
const MONGO_URI = `mongodb://localhost:27017`;
const numberOfBatches = 10;
const batchSize = 400;
const collectionName = 'users';
const query = 'SELECT * FROM users';

async function migrateSqlToMongo() {
    await connectMySql();
    
    console.log('number of pools:', numberOfBatches);
    console.log('batch size:', batchSize);
    const sqlStream = querySql(query).stream();

    let models: any[] = [];
    let rows: any[] = [];
    for(let i = 0; i < numberOfBatches; i++) {
        const conn = mongoose.createConnection(MONGO_URI, { retryWrites: true, w: 'majority' });
        models.push(mongoose.model(collectionName, userSchema, 'users', { connection: conn }))
        rows.push([]);
    }
    let insertedCount = 0;

    const startTimeStamp = Date.now();
    sqlStream.on('data', async (row) => {
        insertedCount++;
        rows[insertedCount%numberOfBatches].push(sqlToMongoUser(row));
        
        // Bulk insert every numberOfBatches*batchSize rows to MongoDB
        if (insertedCount % (numberOfBatches*batchSize) === 0) {
            sqlStream.pause();
            let promises: any[] = [];
            for(let i = 0; i < numberOfBatches; i++) {
                promises.push(models[i].insertMany(rows[i]));
            }
            await Promise.all(promises);
            rows = rows.map(row => []);
            sqlStream.resume();
        }
    });

    sqlStream.on('end', async () => {
        let promises: any[] = [];
        for(let i = 0; i < numberOfBatches; i++) {
            promises.push(models[i].insertMany(rows[i]));
        }
        await Promise.all(promises);
        rows = rows.map(row => []);
        console.log(`Time taken: ${Date.now() - startTimeStamp}ms`);
        // Close connections
        await disconnectMongo();
        await disconnectMySql();
        process.exit();
    });

    sqlStream.on('error', (err) => {
        console.log('sqlStream error: ', err);
    });
}

// numberOfBatches = 10 and batchSize = 1000 giving best time
migrateSqlToMongo();