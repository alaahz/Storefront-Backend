import {Request, Response} from 'express'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';



dotenv.config();
const tokenSecret : string = process.env.TOKEN_SECRET as string;


export const verifyAuthToken =(req:Request, res: Response,next: Function)=>{ 
    try{
        const authorizationHeader = (req.headers.authorization as unknown) as string;
        const token = authorizationHeader.split(' ')[1];
        const decode = jwt.verify(token,tokenSecret);
        next()

        }catch(err){
            res.status(401).json(`Access denied, invalid token, ${err}`)
            return;
        }

}