
# Udacity: Build A Storefront Backend

The 2nd project is to create a Backend API build for an online store to make their great product ideas available for purchase.



## Tools

**Server:** Node JS, Express, Postgres SQL

## Database ERD
The below figure is the entity-relationship model, which is a graphical representation that depicts relationships between tables

 ![Database](https://i.ibb.co/whwBrNn/storefront-database-erd.png)

To know more about the database schema and the endpoints routes are available in the **REQUIREMENTS.md** file.
## Setup

To run this project, please follow the below steps:

#### 1- Clone or download the project:

After that run **npm install** to install all dependencies.

#### 2- Create the database:

You need to create the database and its tables by using Postgres commands.

Open the terminal and run **psql postgres** to open the postgres CLI terminal.
then write the following commands.

#### In psql run these commands:  
- Create user:

```bash
  CREATE USER postgres WITH PASSWORD 'YOUR_PASSWORD';
```
- Create a dev database for the development environment:
```bash
  CREATE DATABASE storefront;
```
- Grant for dev database

```bash
\c storefront
GRANT ALL PRIVILEGES ON DATABASE storefront TO postgres;
```

- Create a test database for the development environment:
```bash
  CREATE DATABASE storefronttest;
```
```bash
\c storefronttest
GRANT ALL PRIVILEGES ON DATABASE storefronttest TO postgres;
```


#### Environment variable and Database.json File

Please make sure to add the following environment variable database JSON to connect to the database.

#### .evn File
****

```bash
ENV=dev
PORT=3000
POSTGRES_HOST=127.0.0.1
POSTGRES_DEV_DB=storefront
POSTGRES_TEST_DB=storefronttest
POSTGRES_USER=postgres
POSTGRES_PASSWORD=YOUR_PASSWORD
BCRYPT_PASSWORD=speak_frient_and_enter
SALT_ROUND=10
PEPPER=YOUR_PEPPER_STRING
TOKEN_SECRET=YOUR_TOKENSECRET_STRING
```
#### database.json File
In case you do not have the database.json file, please use the below.
***

```bash
 {
    "dev": {
      "driver": "pg",
      "host": { "ENV":  "POSTGRES_HOST"},
      "database": { "ENV": "POSTGRES_DEV_DB" },
      "user": { "ENV": "POSTGRES_USER" },
      "password": { "ENV": "POSTGRES_PASSWORD" }
    },
    "test": {
      "driver": "pg",
      "host": { "ENV":  "POSTGRES_HOST" },
      "database": { "ENV": "POSTGRES_TEST_DB" },
      "user": { "ENV": "POSTGRES_USER" },
      "password": { "ENV": "POSTGRES_PASSWORD" }
    }
  }
```
Note: You need to enter your Postgres password, pepper, and token secret


#### 3- Build a folder
 type the terminal **npm run build** to compile TypeScript to JavaScript and create a build folder containing JavaScript files.

#### 4- Migrate Database
- **npm run migrate:up** to create tables in the database.

#### 5- Start the server
- **npm start** to start the server. The backend and database will run on port 3000 (http://localhost:3000/)

#### 6- Testing the server
- **npm run test** to test the models and endpoints.





## References

 - [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
 - [Enumerated Types](https://www.postgresql.org/docs/current/datatype-enum.html)
 

