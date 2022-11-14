"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var order_handlers_1 = require("./order.handlers");
var verifyAuthToken_1 = require("../../middlewares/verifyAuthToken");
var isExisting_1 = require("../../middlewares/isExisting");
var orderHandler = new order_handlers_1.OrderHandler();
var orderRouters = function (app) {
    app.use(verifyAuthToken_1.verifyAuthToken);
    app.post('/orders/newOrder/:userId', verifyAuthToken_1.verifyAuthToken, orderHandler.createOrder);
    app.post('/orders/addProduct/:orderId', verifyAuthToken_1.verifyAuthToken, isExisting_1.isExisting, orderHandler.userAddProductToCart);
    app.get('/orders/allOrders/:userId', verifyAuthToken_1.verifyAuthToken, orderHandler.getUserOrder);
    app.get('/orders/userOrderItems/:userId', verifyAuthToken_1.verifyAuthToken, orderHandler.getUserOrderItems);
    app.get('/orders/completed/:userId', verifyAuthToken_1.verifyAuthToken, orderHandler.getUserCompletedOrders);
    app.put('/orders/update/:orderId', verifyAuthToken_1.verifyAuthToken, orderHandler.UpdateOrder);
    app.delete('/orders/delete/:orderId/:userId', verifyAuthToken_1.verifyAuthToken, orderHandler.deleteOrder);
    app.delete('/orders/:orderId', verifyAuthToken_1.verifyAuthToken, orderHandler.deleteProductOrder);
};
exports.default = orderRouters;
