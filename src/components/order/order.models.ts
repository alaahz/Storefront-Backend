//@ts-ignore
import client from "../../database";
import {orderType, orderItemsType} from "./order.interfaces"


/**
 * Orders class is used to connect to the database
 * and run orders queries.
 */



export class Orders{

    static tableName: string = "orders";
    static orderItemsTable: string = "orderitems";

    //Create a new order for user by taking user id
    async createOrder(userId:number): Promise<orderType>{
        try{
            //@ts-ignore
            const connection = await client.connect();
            const sql = `INSERT INTO ${Orders.tableName}(userId) VALUES ($1) RETURNING *`;
            const result = await connection.query(sql,[userId])
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Could not create order, ${err}`)
        }
    }
    // Add a product to user current order in orderItems table
    async addProductToOrder(order:orderItemsType): Promise<orderItemsType>{
            try{
                //@ts-ignore
                const connection = await client.connect();
                const sql = `INSERT INTO ${Orders.orderItemsTable}(orderId,productId, productQuantity) VALUES ($1,$2,$3) RETURNING *`;
                const result = await connection.query(sql,[order.orderid ,order.productid, order.productquantity])
                connection.release();
                return result.rows[0];
            }catch(err){
                throw new Error(`Could not add product to the order, ${err}`)
            }
    }
    // Returning the user current order list that stored in order table 
    async showOrders(userId:number): Promise<orderType[]>{
        try{
            //@ts-ignore
            const connection = await client.connect();
            const sql = "SELECT * FROM orders WHERE userId=($1)";
            const result = await connection.query(sql,[userId])
            connection.release();
            return result.rows;
        }catch(err){
            throw new Error(`Could not get your orders, ${err}`)
        }
    }
    // Returning the user order products that stored in orderItems table 
    async showUserOrderItems(userId:number): Promise<orderItemsType[]>{
        try{
            //@ts-ignore
            const connection = await client.connect();
            const sql = 'Select t4.userId as userId, t4.orderId, t3.id as ProductId, t3.pname,t3.price, t3.category ,t4.productId, t4.productquantity from products t3 join (SELECT * FROM orders t1 INNER JOIN orderitems t2 ON t1.id = t2.orderId WHERE t1.userId=$1 and t1.status=$2) t4 on t3.id = t4.productId' 
            const result = await connection.query(sql,[userId,'Active'])
            connection.release();
            return result.rows;
        }catch(err){
            throw new Error(`Could get your order items, ${err}`)
        }
    }
    // Returning user order that have complete status
    async completedOrders(userId: number): Promise<orderItemsType[]>{
        try {
            //@ts-ignore
            const connection = await client.connect();
            const sql = 'SELECT * FROM orders  WHERE userId=$1 AND status =$2';
            const result = await connection.query(sql,[userId,'Complete']);
            connection.release();
            return result.rows;
        }catch(err){
            throw new Error(`Could not get completed orders of user ${userId}, ${err}`)

        }
    } 
    // Update order status by giving value and order Id
    async updateStatus(value:string,orderId:number): Promise<orderType>{
        try{
            //@ts-ignore
            const connection = await client.connect();
            const sql = `UPDATE ${Orders.tableName} SET status='${value}' WHERE id=${orderId} RETURNING *`;
            const result = await connection.query(sql)
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Could not update the status of ${orderId} order, ${err}`)
        }


    }
    // Delete user order from database by giving product Id and user Id
    async deleteOrder(orderId:number, userId:number) : Promise<orderType>{
        try{
            //@ts-ignore
            const connection = await client.connect();
            const sql = `DELETE FROM ${Orders.tableName} WHERE id=$1 and userId=$2`;
            const result = await connection.query(sql,[orderId,userId])
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Could not delete order ${orderId}, ${err}`)
        }
    }
    // Delete product from user order by giving product Id and order Id
    async deleteProductFromOrder(orderId:number,  productId:number) : Promise<orderType>{
        try{
            //@ts-ignore
            const connection = await client.connect();
            const sql = `DELETE FROM ${Orders.orderItemsTable} WHERE orderId=$1 and productId=$2`;
            const result = await connection.query(sql,[orderId,productId])
            connection.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Could not remove product from order ${orderId}, ${err}`)
        }
    }

}
