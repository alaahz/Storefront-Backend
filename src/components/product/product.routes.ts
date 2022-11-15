import {Express} from 'express';
import {ProductHandler} from './product.handlers';
import {verifyAuthToken} from '../../middlewares/verifyAuthToken'

const productHandler = new ProductHandler();
const productRouters = (app:Express) =>{
    app.get('/products/:productId', productHandler.getOneProduct)
    app.post('/products/productsCategory',productHandler.getProductsByCat)
    app.get('/products/TopProducts',productHandler.getTopFiveProduct)
    app.get('/products/allproducts', productHandler.getAllProducts)
    app.post('/products/newProduct', verifyAuthToken,productHandler.createNewProduct)
    app.put('/products/update/:productId',verifyAuthToken,productHandler.UpdateProduct)
    app.delete('/products/delete',verifyAuthToken,productHandler.deleteProduct)
}
export default productRouters;