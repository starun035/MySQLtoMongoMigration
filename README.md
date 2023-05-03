##### MySQLtoMongoMigration

##### We are changing the architecture from MVC to Clean Architecture now.

##### In the old version, we were saving our data in MySQL.

##### Now, we have decided to use MongoDB for faster data access.

##### So, we need to migrate the old existing data from MySQL to MongoDB server now.

##### What this script is doing:
#####  1. Establishing a connection with MySQL server(old) and MongoDB server(new).
#####  2. Fetching that data using streams in Node.js.
#####  3. Transforming data received from existing Database as per new architecture design.
#####  4. Saving the data to MongoDB server after transformation.
