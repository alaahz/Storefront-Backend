import {Request, Response} from 'express';
import {Product} from './product.models';
import { ProductType } from './product.interface';
import dotenv from 'dotenv';


dotenv.config()
const product = new Product();


/**
 * ProductHandler class is used to handle the request,invoke the model
 * and send the response to client side.
 */
export class ProductHandler {

    static tokenSecret : string = process.env.TOKEN_SECRET as string;

    async getAllProducts(req: Request, res: Response){
        try{
            const productsList = await product.allProducts();
           return res.status(200).json({ProductsList:productsList})

        }catch(err){
            return res.status(400).json({message:`Something went wrong,${err}`})
        }

        
    }
    async getProductsByCat(req: Request, res: Response){
        const category = String(req.body.category);
        try{
            const catProducts = await product.findProductsByCategory(category);
          return  res.status(200).json({productsList:catProducts})
        }catch(err){
            return res.status(400).json({message:`Something went wrong,${err}`})
        }

    }
    async getOneProduct(req: Request, res: Response){

        const productId = parseInt(req.params.productId)
        try{
            const oneProduct = await product.findProductById(productId)
           return res.status(200).json({product:oneProduct})

        }catch(err){
            return res.status(500).json({message:`Something went wrong,${err}`})
        }
    }
    async createNewProduct(req: Request, res: Response){
        const newProduct : ProductType = {
            pname: req.body.pname as string,
            price: req.body.price as number,
            category: req.body.category as string
        }
        try{
            const productInfo = product.CreateNewProduct(newProduct)
          return  res.status(201).json({message: 'Product created'})

        }catch(err){
            return res.status(400).json({message:`Something went wront,${err}`})
        }

    }

    async getTopFiveProduct(req: Request, res: Response){
        try{
            const TopFive = await product.popularProduct();
           return res.status(200).json({products: TopFive})
        }catch(err){
            return res.status(500).json({message:`Something went wrong,${err}`})
        }

    }

    async UpdateProduct(_req: Request, res: Response){
        const column = String(_req.body.colName );
        const value = String(_req.body.value);
        const productId = parseInt(_req.params.productId) ;
        try{
            const productUpdated = await product.updateValue(column,value,productId);
           return res.status(200).json({message:'successfuly Update'})
        }catch(err){
            return res.status(400).json({message:`Something went wrong,${err}`})
        }

    }
    async deleteProduct(req: Request, res: Response){
        const productId = parseInt(req.body.productId)
        try{
            const productDeleted = await product.deleteProduct(productId);
           return res.status(200).json(`Product id: ${productId} deleted`)
        }catch(err){
            return res.status(400).json({message:`Something went wrong,${err}`})
        }

            
    }

}