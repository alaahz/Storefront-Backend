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
exports.Product = void 0;
//@ts-ignore
var database_1 = __importDefault(require("../../database"));
/**
 * Product class is used to connect to the database
 * and run product queries.
 */
var Product = /** @class */ (function () {
    function Product() {
    }
    // Get all the products stored in the database (products table)
    Product.prototype.allProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, list, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT * FROM ".concat(Product.tableName);
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        result = _a.sent();
                        list = result.rows;
                        connection.release();
                        console.log('list', list);
                        return [2 /*return*/, list];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Could not get all products ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Returning product information by giving product Id
    Product.prototype.findProductById = function (productId) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT id, pname,price,category FROM ".concat(Product.tableName, " WHERE id=$1");
                        return [4 /*yield*/, connection.query(sql, [productId])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Could not get product, ".concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Create new product by giving product name, price and category
    Product.prototype.CreateNewProduct = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "INSERT INTO ".concat(Product.tableName, "(pname,price, category) VALUES($1,$2,$3) RETURNING *");
                        return [4 /*yield*/, connection.query(sql, [product.pname, product.price, product.category])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Could not add new product to ".concat(Product.tableName, " table, ").concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Returning a list products based on the given category
    Product.prototype.findProductsByCategory = function (category) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT * FROM ".concat(Product.tableName, " WHERE category=($1)");
                        return [4 /*yield*/, connection.query(sql, [category])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Connot get products by category ".concat(category, ", ").concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //Returing the top 5 products by counting the number of product that have been ordered
    Product.prototype.popularProduct = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT * FROM products t1 JOIN (SELECT productId, Count (productId) AS total FROM orderItems GROUP BY productId) t2 ON t1.id = t2.productId LIMIT 5";
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Could not get the popular products, ".concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Update product information by giving column name, value and product Id
    Product.prototype.updateValue = function (colName, value, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "UPDATE ".concat(Product.tableName, " SET ").concat(colName, "='").concat(value, "' WHERE id=").concat(productId, " RETURNING id");
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_6 = _a.sent();
                        throw new Error("Could not update the value, ".concat(err_6));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Delete product from database giving the product Id
    Product.prototype.deleteProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "DELETE FROM ".concat(Product.tableName, " WHERE id=$1 RETURNING *");
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_7 = _a.sent();
                        throw new Error("Could not delete product ".concat(id, ", ").concat(err_7));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Product.tableName = 'products';
    return Product;
}());
exports.Product = Product;
