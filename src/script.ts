import mongoose from 'mongoose';
import { querySql } from "./mySqlHelper";

const numberOfBatches = 10;
const batchSize = 400;

export async function migrateSqlToMongo(query: string, collectionName: string, schema: any, transform: any) {
    return new Promise<void>((resolve, reject) => {
        console.log('number of pools:', numberOfBatches);
        console.log('batch size:', batchSize);
        const sqlStream = querySql(query).stream();
        const model = mongoose.model(collectionName, schema);

        let insertedCount = 0;
        let rows: any[] = [];
        for(let i = 0; i < numberOfBatches; i++) {
            rows.push([]);
        }

        const startTimeStamp = Date.now();
        sqlStream.on('data', async (row) => {
            insertedCount++;
            rows[insertedCount%numberOfBatches].push(transform(row));
            
            // Bulk insert every numberOfBatches*batchSize rows to MongoDB
            if (insertedCount % (numberOfBatches*batchSize) === 0) {
                sqlStream.pause();
                try{
                    await Promise.all(rows.map(row => model.insertMany(row)));
                    rows = rows.map(row => []);
                } catch(err) {
                    reject(err);
                }
                sqlStream.resume();
            }
        });

        sqlStream.on('end', async () => {
            try{
                await Promise.all(rows.map(row => model.insertMany(row)));
                rows = rows.map(row => []);
            } catch(err) {
                reject(err);
            }
            console.log(`Time taken: ${Date.now() - startTimeStamp}ms`);
            resolve();
        });

        sqlStream.on('error', (err) => {
            console.log('sqlStream error: ', err);
            reject(err);
        });
    });
}

async function insertData(rows: any, model: any){
    return await Promise.all(rows.map((row: any) => { 
        try{
            model.insertMany(row);
        } catch(err) {
            console.log('Error encountered while inserting data to Mongo');
        }
    }));
}

// numberOfBatches = 10 and batchSize = 1000 giving best time