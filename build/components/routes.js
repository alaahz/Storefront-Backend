"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_routes_1 = __importDefault(require("./user/user.routes"));
var product_routes_1 = __importDefault(require("./product/product.routes"));
var order_routes_1 = __importDefault(require("./order/order.routes"));
var routing = /** @class */ (function () {
    function routing() {
    }
    routing.prototype.api = function (app) {
        (0, user_routes_1.default)(app);
        (0, product_routes_1.default)(app);
        (0, order_routes_1.default)(app);
    };
    return routing;
}());
exports.default = new routing();
