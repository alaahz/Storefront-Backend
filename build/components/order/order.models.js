"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
//@ts-ignore
var database_1 = __importDefault(require("../../database"));
/**
 * Orders class is used to connect to the database
 * and run orders queries.
 */
var Orders = /** @class */ (function () {
    function Orders() {
    }
    //Create a new order for user by taking user id
    Orders.prototype.createOrder = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "INSERT INTO ".concat(Orders.tableName, "(userId) VALUES ($1) RETURNING *");
                        return [4 /*yield*/, connection.query(sql, [userId])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Could not create order, ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Add a product to user current order in orderItems table
    Orders.prototype.addProductToOrder = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "INSERT INTO ".concat(Orders.orderItemsTable, "(orderId,productId, productQuantity) VALUES ($1,$2,$3) RETURNING *");
                        return [4 /*yield*/, connection.query(sql, [order.orderid, order.productid, order.productquantity])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Could not add product to the order, ".concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Returning the user current order list that stored in order table 
    Orders.prototype.showOrders = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT * FROM orders WHERE userId=($1)";
                        return [4 /*yield*/, connection.query(sql, [userId])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Could not get your orders, ".concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Returning the user order products that stored in orderItems table 
    Orders.prototype.showUserOrderItems = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'Select t4.userId as userId, t4.orderId, t3.id as ProductId, t3.pname,t3.price, t3.category ,t4.productId, t4.productquantity from products t3 join (SELECT * FROM orders t1 INNER JOIN orderitems t2 ON t1.id = t2.orderId WHERE t1.userId=$1 and t1.status=$2) t4 on t3.id = t4.productId';
                        return [4 /*yield*/, connection.query(sql, [userId, 'Active'])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Could get your order items, ".concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Returning user order that have complete status
    Orders.prototype.completedOrders = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'SELECT * FROM orders  WHERE userId=$1 AND status =$2';
                        return [4 /*yield*/, connection.query(sql, [userId, 'Complete'])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Could not get completed orders of user ".concat(userId, ", ").concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Update order status by giving value and order Id
    Orders.prototype.updateStatus = function (value, orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "UPDATE ".concat(Orders.tableName, " SET status='").concat(value, "' WHERE id=").concat(orderId, " RETURNING *");
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_6 = _a.sent();
                        throw new Error("Could not update the status of ".concat(orderId, " order, ").concat(err_6));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Delete user order from database by giving product Id and user Id
    Orders.prototype.deleteOrder = function (orderId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "DELETE FROM ".concat(Orders.tableName, " WHERE id=$1 and userId=$2");
                        return [4 /*yield*/, connection.query(sql, [orderId, userId])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_7 = _a.sent();
                        throw new Error("Could not delete order ".concat(orderId, ", ").concat(err_7));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Delete product from user order by giving product Id and order Id
    Orders.prototype.deleteProductFromOrder = function (orderId, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "DELETE FROM ".concat(Orders.orderItemsTable, " WHERE orderId=$1 and productId=$2");
                        return [4 /*yield*/, connection.query(sql, [orderId, productId])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_8 = _a.sent();
                        throw new Error("Could not remove product from order ".concat(orderId, ", ").concat(err_8));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Orders.tableName = "orders";
    Orders.orderItemsTable = "orderitems";
    return Orders;
}());
exports.Orders = Orders;
