"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_handlers_1 = require("./user.handlers");
var verifyAuthToken_1 = require("../../middlewares/verifyAuthToken");
var checkEmail_1 = require("../../middlewares/checkEmail");
var userHandler = new user_handlers_1.UserHandler();
var userRouters = function (app) {
    app.post('/signup', checkEmail_1.checkEmail, userHandler.SignUp);
    app.post('/signin', userHandler.SignIn);
    app.get('/users/allUsers', verifyAuthToken_1.verifyAuthToken, userHandler.getAllUsers);
    app.get('/users/userInfo/:userId', verifyAuthToken_1.verifyAuthToken, userHandler.getOneUser);
    app.put('/users/update/:userId', verifyAuthToken_1.verifyAuthToken, userHandler.UpdateUser);
    app.delete('/users/delete/:userId', verifyAuthToken_1.verifyAuthToken, userHandler.deleteUser);
};
exports.default = userRouters;
