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
exports.OrderHandler = void 0;
var order_models_1 = require("./order.models");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var orders = new order_models_1.Orders();
/**
 * OrderHandler class is used to handle the request,invoke the model
 * and send the response to client side.
 */
var OrderHandler = /** @class */ (function () {
    function OrderHandler() {
    }
    OrderHandler.prototype.createOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, orderInfo, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = parseInt(req.params.userId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, orders.createOrder(userId)];
                    case 2:
                        orderInfo = _a.sent();
                        return [2 /*return*/, res.status(201).json({ orderInfo: orderInfo })];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ message: "Something went wront,".concat(err_1) })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderHandler.prototype.userAddProductToCart = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var addProduct, orderInfo, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addProduct = {
                            orderid: parseInt(req.params.orderId),
                            productid: parseInt(req.body.productId),
                            productquantity: parseInt(req.body.productQuantity)
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, orders.addProductToOrder(addProduct)];
                    case 2:
                        orderInfo = _a.sent();
                        return [2 /*return*/, res.status(200).json({ orderInfo: orderInfo })];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: "Something went wront,".concat(err_2) })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderHandler.prototype.getUserOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, cart, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = parseInt(req.params.userId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, orders.showOrders(userId)];
                    case 2:
                        cart = _a.sent();
                        return [2 /*return*/, res.status(200).json({ orderList: cart })];
                    case 3:
                        err_3 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ message: "Something went wront,".concat(err_3) })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderHandler.prototype.getUserOrderItems = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, cart, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = parseInt(req.params.userId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, orders.showUserOrderItems(userId)];
                    case 2:
                        cart = _a.sent();
                        return [2 /*return*/, res.status(200).json({ userOrderItems: cart })];
                    case 3:
                        err_4 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ message: "Something went wront,".concat(err_4) })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderHandler.prototype.getUserCompletedOrders = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, catProducts, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = parseInt(req.params.userId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, orders.completedOrders(userId)];
                    case 2:
                        catProducts = _a.sent();
                        return [2 /*return*/, res.status(200).json({ CompletedOrderList: catProducts })];
                    case 3:
                        err_5 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ message: "Something went wront,".concat(err_5) })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderHandler.prototype.UpdateOrder = function (_req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var orderId, productUpdated, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderId = parseInt(_req.params.orderId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, orders.updateStatus(orderId)];
                    case 2:
                        productUpdated = _a.sent();
                        return [2 /*return*/, res.status(200).json({ message: "update done" })];
                    case 3:
                        err_6 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: "Something went wront,".concat(err_6) })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderHandler.prototype.deleteOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var productId, userId, orderDeleted, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productId = parseInt(req.params.orderId);
                        userId = parseInt(req.params.userId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, orders.deleteOrder(productId, userId)];
                    case 2:
                        orderDeleted = _a.sent();
                        return [2 /*return*/, res.status(200).json({ message: 'delete done' })];
                    case 3:
                        err_7 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: "Something went wront,".concat(err_7) })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderHandler.prototype.deleteProductOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var orderId, productId, orderDeleted, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderId = parseInt(req.params.orderId);
                        productId = parseInt(req.body.productId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, orders.deleteProductFromOrder(orderId, productId)];
                    case 2:
                        orderDeleted = _a.sent();
                        return [2 /*return*/, res.status(200).json({ message: 'delete done' })];
                    case 3:
                        err_8 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: "Something went wront,".concat(err_8) })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderHandler.tokenSecret = process.env.TOKEN_SECRET;
    return OrderHandler;
}());
exports.OrderHandler = OrderHandler;
