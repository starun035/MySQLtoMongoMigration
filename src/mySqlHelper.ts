import mysql, { Query } from 'mysql';
require('dotenv').config();

export const connection = mysql.createConnection({
    host: process.env.MYSQL_DB_HOST,
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_DATABASE,
    port: process.env.MYSQL_DB_PORT as unknown as number
});

export const connectMySql = async () => {
    return new Promise<void>((resolve, reject) => {
        connection.connect((err) => {
          if (err) {
            console.log('Error connecting to MySQL:', err);
            reject();
            return;
          }
          console.log('Connected to MySQL');
          resolve();
        });
      });
}

export const disconnectMySql = async () => {
    return new Promise<void>((resolve, reject) => {
        connection.end((err) => {
            if (err) {
                console.error('Error closing MySQL connection:', err);
                reject();
                return;
            }
          console.log('MySQL connection closed.');
          resolve();
        });
    });
}

export const queryMySql = async (query: string) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
          if (err) {
            reject(err);
            return;
          }
          console.log('Data fetched from sql');
          resolve(results);
        });
    });
}

export const querySql = (query: string): Query => {
  return connection.query(query);
}