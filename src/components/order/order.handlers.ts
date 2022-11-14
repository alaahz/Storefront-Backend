import {Request, Response} from 'express';
import {Orders} from './order.models';
import { orderItemsType } from './order.interfaces';
import dotenv from 'dotenv';


dotenv.config()
const orders = new Orders();

/**
 * OrderHandler class is used to handle the request,invoke the model
 * and send the response to client side.
 */

export class OrderHandler {
    static tokenSecret : string = process.env.TOKEN_SECRET as string;
    async createOrder(req: Request, res: Response) {
        const userId = parseInt(req.params.userId);
        try{
            const orderInfo = orders.createOrder(userId)
          return  res.status(201).json({message:'Order created successfully to user id: ' + userId});

        }catch(err){
            return res.status(500).json({message:`Something went wront,${err}`})
        }
    }
    async userAddProductToCart(req: Request, res: Response) {
    
        const addProduct : orderItemsType = {
            orderid: parseInt(req.params.orderId),
            productid: parseInt(req.body.productId ),
            productquantity: parseInt(req.body.productQuantity )
        }
        try{
            const orderInfo = orders.addProductToOrder(addProduct)
           return res.status(200).json({message:`product id ${addProduct.productid} added to order id : ${addProduct.orderid}`})

        }catch(err){
            return res.status(400).json({message:`Something went wront,${err}`})
        }
    }

    async getUserOrder(req: Request, res: Response){

        const userId = parseInt(req.params.userId)
        try{
            const cart = await orders.showOrders(userId);
            return res.status(200).json({orderList:cart})
        }catch(err){
            return res.status(500).json({message:`Something went wront,${err}`})
        }

    }

    async getUserOrderItems(req: Request, res: Response){

        const userId = parseInt(req.params.userId)
        try{
            const cart = await orders.showUserOrderItems(userId);
            return res.status(200).json({userOrderItems:cart})
        }catch(err){
            return res.status(500).json({message:`Something went wront,${err}`})
        }

    }
    async getUserCompletedOrders(req: Request, res: Response){
        const userId = parseInt(req.params.userId)
        try{
            const catProducts = await orders.completedOrders(userId);
           return res.status(200).json({CompletedOrderList:catProducts})
        }catch(err){
            return res.status(500).json({message:`Something went wront,${err}`})
        }

    }
    async UpdateOrder(_req: Request, res: Response){
        const orderId = parseInt(_req.params.orderId);
        const value = String(_req.body.value);
        try{
            const productUpdated = await orders.updateStatus(value,orderId);
          return  res.status(200).json({message:`update done`})
        }catch(err){
            return res.status(400).json({message:`Something went wront,${err}`})
        }

    }
    async deleteOrder(req: Request, res: Response){

        const productId = parseInt(req.params.orderId)
        const userId = parseInt(req.params.userId);
        try{
            const orderDeleted = await orders.deleteOrder(productId,userId);
           return res.status(200).json({message:'delete done'})
        }catch(err){
            return res.status(400).json({message:`Something went wront,${err}`})
        }

            
    }
    async deleteProductOrder(req: Request, res: Response){

        const orderId = parseInt(req.params.orderId)
        const productId = parseInt(req.body.productId);
        try{
            const orderDeleted = await orders.deleteProductFromOrder(orderId,productId);
           return res.status(200).json({message:'delete done'})
        }catch(err){
           return res.status(400).json({message:`Something went wront,${err}`})
        }

            
    }





}
