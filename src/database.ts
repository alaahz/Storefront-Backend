//connect to database
import dotenv from 'dotenv';
import {Pool} from 'pg';



dotenv.config();
let client 
const {
    ENV,
    POSTGRES_HOST, 
    POSTGRES_DEV_DB,
    POSTGRES_TEST_DB, 
    POSTGRES_USER, 
    POSTGRES_PASSWORD
} = process.env


if(ENV ==='test'){
    client = new Pool({
        host:POSTGRES_HOST,
        database:POSTGRES_TEST_DB,
        user:POSTGRES_USER,
        password:POSTGRES_PASSWORD
    })

}
if(ENV ==='dev'){
    client = new Pool({
        host:POSTGRES_HOST,
        database:POSTGRES_DEV_DB,
        user:POSTGRES_USER,
        password:POSTGRES_PASSWORD
    })

}


export default client;