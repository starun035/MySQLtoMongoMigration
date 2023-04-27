import { Schema } from "mongoose";
import { sqlToMongoExpense } from "./mapper/expenseMapper";
import { sqlToMongoInvoice } from "./mapper/invoiceMapper";
import { sqlToMongoMeasurement } from "./mapper/measurementMapper";
import { sqlToMongoProduct } from "./mapper/productMapper";
import { sqlToMongoRefVersion } from "./mapper/refVersionMapper";
import { sqlToMongoRetailer } from "./mapper/retailerMapper";
import { sqlToMongoUser } from "./mapper/userMapper";
import { sqlToMongoUserMetaData } from "./mapper/userMetaDataMapper";
import { expenseSchema } from "./schemas/expenseSchema";
import { invoiceSchema } from "./schemas/invoiceSchema";
import { measurementSchema } from "./schemas/measurementSchema";
import { productSchema } from "./schemas/productSchema";
import { refVersionSchema } from "./schemas/refVersionSchema";
import { retailerSchema } from "./schemas/retailerSchema";
import { userMetaDataSchema } from "./schemas/userMetaDataSchema";
import { userSchema } from "./schemas/userSchema";
import { migrateSqlToMongo } from "./script";
import { connectMySql, disconnectMySql } from "./mySqlHelper";
import { connectMongo, disconnectMongo } from "./mongoHelper";
require('dotenv').config();

interface Req {
    query: string;
    collectionName: string;
    schema: Schema;
    transform: Function;
}

const user: Req = {
    query: 'select * from users',
    collectionName: 'users',
    schema: userSchema,
    transform: sqlToMongoUser
}

const retailer: Req = {
    query: 'select * from users',
    collectionName: 'retailers',
    schema: retailerSchema,
    transform: sqlToMongoRetailer
}

const userMetaData: Req = {
    query: 'select * from userMetaData',
    collectionName: 'userMetaData',
    schema: userMetaDataSchema,
    transform: sqlToMongoUserMetaData
}

const refVersion: Req = {
    query: 'select * from refVersions',
    collectionName: 'refVersion',
    schema: refVersionSchema,
    transform: sqlToMongoRefVersion
}

const product: Req = {
    query: 'select * from masterItems',
    collectionName: 'products',
    schema: productSchema,
    transform: sqlToMongoProduct
}

const measurement: Req = {
    query: 'select * from measurements',
    collectionName: 'measurements',
    schema: measurementSchema,
    transform: sqlToMongoMeasurement
}

const invoice: Req = {
    query: 'select * from invoices',
    collectionName: 'invoices',
    schema: invoiceSchema,
    transform: sqlToMongoInvoice
}

const expense: Req = {
    query: 'select * from expenses',
    collectionName: 'expense',
    schema: expenseSchema,
    transform: sqlToMongoExpense
}

const migrate = async (requests: Req[]) => {
    await connectMySql();
    await connectMongo(process.env.MONGO_URI as string);
    console.time('TOTAL TIME: ');
    for (const request of requests) {
        try{
            console.log('Migrating', request.collectionName);
            await migrateSqlToMongo(request.query, request.collectionName, request.schema, request.transform);
        } catch(err) {
            console.log('error in collection:', request.collectionName, err);
        }
    }
    console.timeEnd('TOTAL TIME: ');
    // Close connections
    await disconnectMongo();
    await disconnectMySql();
}

const requests = [user, retailer, userMetaData, refVersion, product, measurement, invoice, expense];
// const requests = [refVersion];
migrate(requests);