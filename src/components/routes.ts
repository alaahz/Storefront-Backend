import {Router,Express} from 'express';
import userRouters from './user/user.routes'
import productRouters from './product/product.routes'
import orderRouters from './order/order.routes'



class routing{
    api(app:Express){
        userRouters(app);
        productRouters(app);
        orderRouters(app);
        
    }

}


export default new routing();