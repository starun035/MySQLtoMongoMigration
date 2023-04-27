import { connectMongo, disconnectMongo } from "../mongoHelper";
import mongoose from 'mongoose';
import { userSchema } from "../schemas/userSchema";
import { connectMySql, disconnectMySql, querySql } from "../mySqlHelper";
import { sqlToMongoUser } from "../mapper/userMapper";

const MONGO_URI = `mongodb+srv://starun035:qwerty123@cluster0.xqvewgd.mongodb.net/?retryWrites=true&w=majority/test`;
// const MONGO_URI = `mongodb://localhost:27017/test`;
const N = 1001;
const collectionName = 'users';
const query = 'SELECT * FROM users';

async function migrateSqlToMongo() {
    await connectMySql();
    await connectMongo(MONGO_URI);

    const sqlStream = querySql(query).stream();
    const model = mongoose.model(collectionName, userSchema);
    let bulk = model.collection.initializeUnorderedBulkOp();
    let insertedCount = 0;

    const startTimeStamp = Date.now();
    sqlStream.on('data', async (row) => {
        bulk.insert(sqlToMongoUser(row));
        insertedCount++;
        
        // Bulk insert every N rows to MongoDB
        if (insertedCount % N === 0) {
            bulk.execute();
            bulk = model.collection.initializeUnorderedBulkOp();
        }
    });

    sqlStream.on('end', async () => {
        await bulk.execute();
        console.log(`Time taken: ${Date.now() - startTimeStamp}ms`);
        // Close connections
        await disconnectMongo();
        await disconnectMySql();
    });

    sqlStream.on('error', (err) => {
        console.log('sqlStream error: ', err);
    });
}


migrateSqlToMongo();
