//@ts-ignore
import client from "../../database";
import {UserType} from './user.interface'
import bcrypt from "bcrypt";
import dotenv from 'dotenv';




dotenv.config();

/**
 * User class is used to connect to the database
 * and run all user queries.
 */
export class User {


    static pepper: string = process.env.PEPPER as string;
    static saltRound: string = process.env.SALT_ROUND as string;
    static tableName = 'users';



    //Create user account takes user first and last name, email and password
    async createUser(userInfo :UserType) : Promise<UserType>{
        try{
            //@ts-ignore
            const connection = await client.connect();
            const sql = `INSERT INTO ${User.tableName}(firstName, lastName, email, password) VALUES ($1,$2,$3,$4) RETURNING firstname, lastname, email`;
            const hash = bcrypt.hashSync(
                userInfo.password + User.pepper, 
                parseInt(User.saltRound) 
            )
            const result = await connection.query(sql,[userInfo.firstname,userInfo.lastname,userInfo.email,hash]);
            const user =  result.rows[0];
            connection.release();
            return user;
        }catch(err){
            throw new Error(`Connot creaet account ${err}`)
        }
    }
    //This model called when user signin
    async Authenticate(email: string, password:string):Promise<UserType | null>{
        try{
            //@ts-ignore
            const connection = await client.connect();
            const sql = `SELECT * FROM ${User.tableName} WHERE email=($1)`;

            const result = await connection.query(sql,[email]);
            connection.release();

            if(result.rows?.length){

                const user = result.rows[0];
                if(bcrypt.compareSync(password+User.pepper,user.password)){
                    return user
                }
                return null;

            }
            return null;
            
            
        }catch(err){
            throw new Error(`Connot login, ${err}`)
        }

    }

    //Return all users stored in users table
    async allUsers() : Promise<UserType []| null>{
        try{
            //@ts-ignore
            const connection = await client.connect();
            const sql = `SELECT id, firstName, lastName, email FROM ${User.tableName}`;
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }catch(err){
            throw new Error(`Connot get user All users, ${err}`)
        }
    }

    //Used to find user information by email 
    async findByEmail(email:string): Promise <boolean>{
        try{
            //@ts-ignore
            const connection = await client.connect();
            const sql = `SELECT id, firstName, lastName, email from ${User.tableName} where email=$1`;
            const result = await connection.query(sql,[email]);
            connection.release();
            if (result.rows.length === 0){
                return false

            }else{
                return true
            }
            

        }catch(err){
            throw new Error(`Connot get user Information ${email}, ${err}`)
        }


    }
    //Used to find user by user id 
    async findUserById(userId: number) : Promise<UserType | null>{
        try{
            //@ts-ignore
            const connection = await client.connect();
            const sql = `SELECT id, firstName, lastName, email from ${User.tableName} where id=($1) `;
            const result = await connection.query(sql,[userId]);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Connot get user Information ${userId}, ${err}`)
        }
    }
    //Update user information by taking column name, value and user id
    async update(colName:string, value:string, userId:number):Promise<UserType>{
        try{
            //@ts-ignore
            const connection = await client.connect();
            const sql = `UPDATE ${User.tableName} SET ${colName}='${value}' WHERE id=${userId} RETURNING *`;
            const result = await connection.query(sql);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Connot update user, ${err}`)
        }
    }
    //Delete user account from database by taking user id
    async deleteUser(userId: number) : Promise<UserType>{
        try{
            //@ts-ignore
            const connection = await client.connect();
            const sql = `DELETE FROM ${User.tableName} where id=$1 RETURNING *`;
            const result = await connection.query(sql,[userId]);
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Connot delete user ${userId}, ${err}`)
        }
    }



    

} 

