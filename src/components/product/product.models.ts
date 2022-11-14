//@ts-ignore
import client from "../../database";
import {ProductType} from './product.interface';

/**
 * Product class is used to connect to the database
 * and run product queries.
 */

export class Product{
    static tableName = 'products';

    // Get all the products stored in the database (products table)
    async allProducts():Promise<ProductType[]>{
        try{
            //@ts-ignore
            const connection = await client.connect();
            const sql = `SELECT * FROM ${Product.tableName}`;
            const result = await connection.query(sql)
            const list = result.rows;
            connection.release();
            console.log('list',list)
            return list;


        }catch(err){
            throw new Error(`Could not get all products ${err}`)
        }
    }
    
    // Returning product information by giving product Id
    async findProductById(productId:number):Promise<ProductType>{
        try{
            //@ts-ignore
            const connection = await client.connect();
            const sql = `SELECT id, pname,price,category FROM ${Product.tableName} WHERE id=$1`;
            const result = await connection.query(sql,[productId])
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Could not get product, ${err}`)
        }
    }

    // Create new product by giving product name, price and category
    async CreateNewProduct(product:ProductType):Promise<ProductType>{
        try{
             //@ts-ignore
             const connection = await client.connect();
             const sql = `INSERT INTO ${Product.tableName}(pname,price, category) VALUES($1,$2,$3) RETURNING *`;
             const result = await connection.query(sql,[product.pname, product.price,product.category])
             connection.release();
             return result.rows[0];

        }catch(err){
            throw new Error(`Could not add new product to ${Product.tableName} table, ${err}`)

        }
    }
    // Returning a list products based on the given category
    async findProductsByCategory(category: string):Promise<ProductType[]>{
        try{
            //@ts-ignore
            const connection = await client.connect();
            const sql = `SELECT * FROM ${Product.tableName} WHERE category=($1)`;
            const result = await connection.query(sql,[category])
            connection.release();
            return result.rows;
        }catch(err){
            throw new Error(`Connot get products by category ${category}, ${err}`)
        }
    }
    //Returing the top 5 products by counting the number of product that have been ordered
    async popularProduct():Promise<ProductType[]>{
        try{
            //@ts-ignore
            const connection = await client.connect();
            const sql = `SELECT * FROM products t1 JOIN (SELECT productId, Count (productId) AS total FROM orderItems GROUP BY productId) t2 ON t1.id = t2.productId LIMIT 5`;
            const result = await connection.query(sql)
            connection.release();
            return result.rows;

       }catch(err){
           throw new Error(`Could not get the popular products, ${err}`)

       }

    }
    // Update product information by giving column name, value and product Id
    async updateValue(colName:string, value:string, productId:number): Promise<ProductType>{
        try{
            //@ts-ignore
            const connection = await client.connect();
            const sql = `UPDATE ${Product.tableName} SET ${colName}='${value}' WHERE id=${productId} RETURNING id`;
            const result = await connection.query(sql)
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Could not update the value, ${err}`)
        }
    }
    // Delete product from database giving the product Id
    async deleteProduct(id: number) : Promise<ProductType>{
        try{
            //@ts-ignore
            const connection = await client.connect();
            const sql = `DELETE FROM ${Product.tableName} WHERE id=$1 RETURNING *`;
            const result = await connection.query(sql,[id])
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Could not delete product ${id}, ${err}`)
        }
    }
}