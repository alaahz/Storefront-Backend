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
exports.ProductHandler = void 0;
var product_models_1 = require("./product.models");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var product = new product_models_1.Product();
/**
 * ProductHandler class is used to handle the request,invoke the model
 * and send the response to client side.
 */
var ProductHandler = /** @class */ (function () {
    function ProductHandler() {
    }
    ProductHandler.prototype.getAllProducts = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var productsList, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, product.allProducts()];
                    case 1:
                        productsList = _a.sent();
                        return [2 /*return*/, res.status(200).json({ ProductsList: productsList })];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: "Something went wrong,".concat(err_1) })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductHandler.prototype.getProductsByCat = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var category, catProducts, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        category = String(req.body.category);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, product.findProductsByCategory(category)];
                    case 2:
                        catProducts = _a.sent();
                        return [2 /*return*/, res.status(200).json({ productsList: catProducts })];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: "Something went wrong,".concat(err_2) })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductHandler.prototype.getOneProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var productId, oneProduct, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productId = parseInt(req.params.productId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, product.findProductById(productId)];
                    case 2:
                        oneProduct = _a.sent();
                        return [2 /*return*/, res.status(200).json({ product: oneProduct })];
                    case 3:
                        err_3 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ message: "Something went wrong,".concat(err_3) })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductHandler.prototype.createNewProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var newProduct, productInfo;
            return __generator(this, function (_a) {
                newProduct = {
                    pname: req.body.pname,
                    price: req.body.price,
                    category: req.body.category
                };
                try {
                    productInfo = product.CreateNewProduct(newProduct);
                    return [2 /*return*/, res.status(201).json({ message: 'Product created' })];
                }
                catch (err) {
                    return [2 /*return*/, res.status(400).json({ message: "Something went wront,".concat(err) })];
                }
                return [2 /*return*/];
            });
        });
    };
    ProductHandler.prototype.getTopFiveProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var TopFive, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, product.popularProduct()];
                    case 1:
                        TopFive = _a.sent();
                        return [2 /*return*/, res.status(200).json({ products: TopFive })];
                    case 2:
                        err_4 = _a.sent();
                        return [2 /*return*/, res.status(500).json({ message: "Something went wrong,".concat(err_4) })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductHandler.prototype.UpdateProduct = function (_req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var column, value, productId, productUpdated, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        column = String(_req.body.colName);
                        value = String(_req.body.value);
                        productId = parseInt(_req.params.productId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, product.updateValue(column, value, productId)];
                    case 2:
                        productUpdated = _a.sent();
                        return [2 /*return*/, res.status(200).json({ message: 'successfuly Update' })];
                    case 3:
                        err_5 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: "Something went wrong,".concat(err_5) })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductHandler.prototype.deleteProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var productId, productDeleted, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productId = parseInt(req.body.productId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, product.deleteProduct(productId)];
                    case 2:
                        productDeleted = _a.sent();
                        return [2 /*return*/, res.status(200).json("Product id: ".concat(productId, " deleted"))];
                    case 3:
                        err_6 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: "Something went wrong,".concat(err_6) })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductHandler.tokenSecret = process.env.TOKEN_SECRET;
    return ProductHandler;
}());
exports.ProductHandler = ProductHandler;
