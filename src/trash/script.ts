import { connectMongo, disconnectMongo, insertToMongo } from '../mongoHelper';
import { userSchema } from '../schemas/userSchema';
import { connectMySql, disconnectMySql, queryMySql } from '../mySqlHelper';

const MONGO_URI = `mongodb+srv://starun035:qwerty123@cluster0.xqvewgd.mongodb.net/?retryWrites=true&w=majority/test`;
const collectionName = 'users';

async function script() {
    await connectMySql();
    await connectMongo(MONGO_URI);
    

    const query = 'SELECT * FROM users LIMIT 200';
    const startTimeStamp = Date.now();
    const data = await queryMySql(query);
    const endTimeStamp = Date.now();
    console.log('Time taken to fetch data from MySql:', endTimeStamp - startTimeStamp);

    const timeTaken = await insertToMongo(userSchema, data, collectionName);

    console.log('Time taken to insert data to MongoDB:', timeTaken);

    await disconnectMongo();
    await disconnectMySql();
}

script();