"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmail = void 0;
var user_models_1 = require("../components/user/user.models");
var user = new user_models_1.User();
var checkEmail = function (req, res, next) {
    var email = String(req.body.email);
    var result = user.findByEmail(email);
    if (!result) {
        return res.status(404).json({ message: 'Email is existing, Please sign in' });
    }
    else {
        next();
    }
};
exports.checkEmail = checkEmail;
