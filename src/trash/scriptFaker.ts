const fs = require('fs');
import { connectMongo, disconnectMongo, insertToMongo } from '../mongoHelper';
const { v4: uuid } = require('uuid');
import { faker } from '@faker-js/faker';
import { IStudent, studentSchema } from '../schemas/studentSchema';

async function script() {
    const MONGO_URI = `mongodb+srv://starun035:qwerty123@cluster0.xqvewgd.mongodb.net/?retryWrites=true&w=majority/School`;
    const collectionName = 'student';
    await connectMongo(MONGO_URI);
    
    const timeTaken = 0
    let p: Promise<any>[] = [];
    for(let i = 0; i < 10; i++){
        // generate data
        const data: IStudent[] = [];
        for(let j = 0; j < 10; j++){
            let studentObj = {
                studentId: uuid(),
                studentFirstName: faker.name.firstName(),
                studentLastName: faker.name.lastName(),
                studentClass: faker.datatype.number({min: 1, max:12}),
                studentEmail: faker.internet.email()
            }
            data.push(studentObj);
        }
        p[i] = insertToMongo(studentSchema, data, collectionName);
    }
    Promise.all(p)
        .then((values) => {
            console.log(values);
        })
        .catch((error) => {
            console.error(error.message);
        });
    
    await disconnectMongo();
    console.log(`Time taken to insert data to MongoDB: ${timeTaken}ms`);
}

script();