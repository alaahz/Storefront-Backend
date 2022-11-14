



import {Request, Response} from 'express'
//@ts-ignore
import client from "../database";

export const isExisting = async (req: Request, res: Response, next: Function) => {

   const id = parseInt(req.params.orderId)
   //@ts-ignore

   const conn = await client.connect();
   const sql = `Select * from orders where id=${id}`

   const result = await conn.query(sql)
   if(!result.rows.length){
    return res.status(404).json({message:`It seem the ${id} is not exiting`});
   }else{
    next();
   }

}