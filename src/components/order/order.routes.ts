import {Express} from 'express';
import {OrderHandler} from './order.handlers';
import {verifyAuthToken} from '../../middlewares/verifyAuthToken'
import {isExisting} from '../../middlewares/isExisting'

const orderHandler = new OrderHandler();
const orderRouters = (app:Express) =>{
    app.use(verifyAuthToken)
    app.post('/orders/newOrder/:userId',verifyAuthToken,orderHandler.createOrder)
    app.post('/orders/addProduct/:orderId',verifyAuthToken,isExisting,orderHandler.userAddProductToCart)
    app.get('/orders/allOrders/:userId',verifyAuthToken,orderHandler.getUserOrder)
    app.get('/orders/userOrderItems/:userId',verifyAuthToken,orderHandler.getUserOrderItems)
    app.get('/orders/completed/:userId',verifyAuthToken,orderHandler.getUserCompletedOrders)
    app.put('/orders/update/:orderId',verifyAuthToken,orderHandler.UpdateOrder)
    app.delete('/orders/delete/:orderId/:userId',verifyAuthToken,orderHandler.deleteOrder)
    app.delete('/orders/:orderId',verifyAuthToken,orderHandler. deleteProductOrder)
    
  
}
export default orderRouters;