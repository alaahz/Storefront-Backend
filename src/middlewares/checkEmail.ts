import {Request, Response} from 'express'
import {User} from '../components/user/user.models';

const user = new User()
export const checkEmail = (req: Request, res: Response, next: Function) => {

    const email = String(req.body.email);

   const result =  user.findByEmail(email);
   if(!result){
    return res.status(404).json({message:'Email is existing, Please sign in'});
   }else{
    next();
   }

    






}