import mongoose, { Schema } from 'mongoose';

export const insertToMongo = async (schema: Schema, data: any, collectionName: string): Promise<any> => {
    const startTimeStamp = Date.now();

    const model = mongoose.model(collectionName, schema);
    await model.insertMany(data);

    const endTimeStamp = Date.now();
    return endTimeStamp - startTimeStamp;
}

export const disconnectMongo = async () => {
    await mongoose.connection.close();
}

export const connectMongo = async (connStr: string) => {
    return mongoose
    .connect(connStr, { retryWrites: true, w: 'majority', maxPoolSize: 10 })
    .then((db:any) => {
        console.log('Mongo connected successfully');
        return db;
    })
    .catch((error) => {
        console.log('Error connecting to database:', error);
    });
}