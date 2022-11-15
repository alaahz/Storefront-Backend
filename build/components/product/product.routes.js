"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var product_handlers_1 = require("./product.handlers");
var verifyAuthToken_1 = require("../../middlewares/verifyAuthToken");
var productHandler = new product_handlers_1.ProductHandler();
var productRouters = function (app) {
    app.get('/products/:productId', productHandler.getOneProduct);
    app.post('/products/productsCategory', productHandler.getProductsByCat);
    app.get('/products/TopProducts', productHandler.getTopFiveProduct);
    app.get('/products/allproducts', productHandler.getAllProducts);
    app.post('/products/newProduct', verifyAuthToken_1.verifyAuthToken, productHandler.createNewProduct);
    app.put('/products/update/:productId', verifyAuthToken_1.verifyAuthToken, productHandler.UpdateProduct);
    app.delete('/products/delete', verifyAuthToken_1.verifyAuthToken, productHandler.deleteProduct);
};
exports.default = productRouters;
