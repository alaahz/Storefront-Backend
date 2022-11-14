import {Request, Response} from 'express';
import {User} from './user.models';
import {UserType} from './user.interface'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';




dotenv.config();


const  user = new User()

/**
 * UserHandler class is used to handle the request,invoke the model
 * and send the response to client side.
 */
export class UserHandler{

    static tokenSecret : string = process.env.TOKEN_SECRET as string;

    
    async SignUp(_req: Request, res: Response){
        const userInfo: UserType = {
            firstname : _req.body.firstname as string,
            lastname : _req.body.lastname as string,
            email : _req.body.email as string,
            password : _req.body.password as string,
        }
        try{
            const newUser = await user.createUser(userInfo);
            var token = jwt.sign({u:newUser},UserHandler.tokenSecret);
           return res.status(201).json({token:token});
            
        }catch(err){
            return res.status(400).json(`Could not sign up, ${err}`)
            

        }
    }

    async SignIn(_req: Request, res: Response){
       const email= String(_req.body.email)
       const password = String(_req.body.password)

        
        try{
            const existingUser = await user.Authenticate(email,password);
            if(!existingUser){
                return res.status(404).send('The passowrd or email is incorrect.')
                
            }
            const token = jwt.sign({u:existingUser}, UserHandler.tokenSecret);
            return  res.status(200).json({token:token});
            
 
        }catch(err){
           return res.status(400).json(`Could not sign in, ${err}`)
            

        }

    }
    async getAllUsers(req: Request, res: Response){

        try{
            const allUsers = await user.allUsers();
            return res.status(200).json({userList:allUsers})
        }catch(err){
            return res.status(500).json({message: `Something went wront,${err}`})

        }



    }
    async getOneUser(req: Request, res: Response){
        const userId = parseInt(req.params.userId)
        try{
            const userInfo = await user.findUserById(userId);
           return res.status(200).json({userInfo:userInfo})
        }catch(err){
            return res.status(500).json({message: `Something went wront,${err}`})
        }

    }

    async UpdateUser(_req: Request, res: Response){
        const column = String(_req.body.colName);
        const value = String(_req.body.value as string);
        const userId = parseInt(_req.params.userId) ;

        try{
            const upDated = await user.update(column,value,userId);
            return res.status(200).json({message:'update done'})
        }catch(err){
           return res.status(400).json({message: `Something went wront,${err}`})
        }

    }
    async deleteUser(req: Request, res: Response){

        const userId = parseInt(req.params.userId)
        try{
            const uDelete = await user.deleteUser(userId);
             return res.status(200).json({message:'User successfuly deleted'})
        }catch(err){
            return res.status(400).json({message: `Something went wront,${err}`})

        }

            
    }
} 