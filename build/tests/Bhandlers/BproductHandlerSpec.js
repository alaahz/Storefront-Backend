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
var server_1 = __importDefault(require("../../server"));
var supertest_1 = __importDefault(require("supertest"));
describe('Testing Product Endpoints: ', function () {
    var token = '';
    // beforeAll used to call signin endpoint and generate token to use it in each case 
    beforeAll(function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default).post('/signin')
                            .send({
                            email: 'alaahz@test.com',
                            password: '12345',
                        })];
                    case 1:
                        response = _a.sent();
                        token = response.body.token;
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Create new Product returning 201', function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                            .post('/products/newProduct')
                            .set('Authorization', "Bearer ".concat(token))
                            .send({
                            pname: 'Java Progamming',
                            price: 20,
                            category: 'Book'
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(201);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Get product info returning 200', function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                            .get("/products/".concat(4))];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        console.log(response.body);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Get All Products returning 200', function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                            .get('/products/allproducts')];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        console.log(response.body);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Get category products returning 200', function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                            .get('/products/productsCategory')
                            .send({
                            category: 'Book',
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        console.log(response.body);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Returing 400 beacuse the category is wrong', function () {
        return __awaiter(this, void 0, void 0, function () {
            var response1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                            .get('/products/productsCategory')
                            .send({
                            category: 'Music',
                        })];
                    case 1:
                        response1 = _a.sent();
                        expect(response1.statusCode).toBe(400);
                        console.log(response1.body);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Get the top 5 products', function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                            .get('/products/TopProducts')];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        console.log(response.body);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Update product information returning 200', function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                            .put("/products/update/".concat(3))
                            .set('Authorization', "Bearer ".concat(token))
                            .send({
                            colName: 'pname',
                            value: 'how to test',
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        return [2 /*return*/];
                }
            });
        });
    });
    it('Delete product returning 200', function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default)
                            .delete('/products/delete')
                            .send({
                            productId: 2
                        })
                            .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        return [2 /*return*/];
                }
            });
        });
    });
});