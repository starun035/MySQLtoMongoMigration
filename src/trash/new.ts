import { MongoClient } from 'mongodb';
import fs from 'fs';
import { connectMySql, disconnectMySql, querySql } from '../mySqlHelper';
import { connectMongo, disconnectMongo } from '../mongoHelper';

// const mysqlConnection = mysql.createConnection(mysqlConfig);

// const transformStream = new Transform({
    //   objectMode: true,
    //   transform(chunk, encoding, callback) {
        //     const transformedChunk = {
            //       name: chunk.name,
            //       email: chunk.email,
            //       // Transform other fields as needed
            //     };
            //     callback(null, transformedChunk);
            //   },
            // });
// const MONGO_URI = `mongodb+srv://starun035:qwerty123@cluster0.xqvewgd.mongodb.net/?retryWrites=true`;
const MONGO_URI = `mongodb://localhost:27017/`;
const query = 'SELECT * FROM users';

async function insertBatchToMongo() {
    await connectMySql();
    const n = 10;

    const mongoClient = new MongoClient(MONGO_URI);
    // await connectMongo(MONGO_URI);
    // const collection = mongoose.model('users', userSchema);
    const db = mongoClient.db('test');
    const collection = db.collection('users');
    const stream = querySql(query).stream();
    

    let batchArray: any[] = [];
    for (let i = 0; i < n; i++) {
        batchArray.push([]);
    }
    let count = 0;
    const startTimeStamp = Date.now();
    stream.on('data', async (row) => {
      count++;
      batchArray[count%n].push(row);
      if (count % (n*100) === 0) {
          await Promise.all(batchArray.map((batchSlice) => collection.insertMany(batchSlice)));
          batchArray = batchArray.map(row => []);
      }
    });

    stream.on('end', async () => {
        await Promise.all(batchArray.map((batchSlice) => collection.insertMany(batchSlice)));
        batchArray = batchArray.map(row => []);

        console.log(`Time taken: ${Date.now() - startTimeStamp}ms`);
        // Close connections
        await disconnectMongo();
        await disconnectMySql();
    });

    stream.on('error', (err) => {
        console.log('sqlStream error: ', err);
    });
}


// const writableStream = new Writable({
//   objectMode: true,
//   highWaterMark: 10000, // Set a highWaterMark to batch inserts
//   async write(chunk, encoding, callback) {
//     try {
//       await insertBatchToMongo(chunk);
//       callback();
//     } catch (error) {
//       callback(error);
//     }
//   },
// });

// async function run() {
//   await Promise.all([mysqlConnection.connect(), mongoClient.connect()]);
//   const readableStream = mysqlConnection.query('SELECT * FROM users', {
//     highWaterMark: 50000, // Set a highWaterMark to fetch data in batches
//   });

//   readableStream
//     .pipe(transformStream)
//     .pipe(writableStream)
//     .on('error', (error) => {
//       console.error(error);
//       process.exit(1);
//     })
//     .on('finish', () => {
//       console.log('All users inserted successfully!');
//       process.exit(0);
//     });
// }

// run().catch((error) => {
//   console.error(error);
//   process.exit(1);
// });

async function main(){
  await insertBatchToMongo();

}

main();