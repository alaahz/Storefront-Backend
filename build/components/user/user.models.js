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
exports.User = void 0;
//@ts-ignore
var database_1 = __importDefault(require("../../database"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * User class is used to connect to the database
 * and run all user queries.
 */
var User = /** @class */ (function () {
    function User() {
    }
    //Create user account takes user first and last name, email and password
    User.prototype.createUser = function (userInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, hash, result, user, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "INSERT INTO ".concat(User.tableName, "(firstName, lastName, email, password) VALUES ($1,$2,$3,$4) RETURNING *");
                        hash = bcrypt_1.default.hashSync(userInfo.password + User.pepper, parseInt(User.saltRound));
                        return [4 /*yield*/, connection.query(sql, [userInfo.firstname, userInfo.lastname, userInfo.email, hash])];
                    case 2:
                        result = _a.sent();
                        user = result.rows[0];
                        connection.release();
                        return [2 /*return*/, user];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Connot creaet account ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //This model called when user signin
    User.prototype.Authenticate = function (email, password) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, user, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _b.sent();
                        sql = "SELECT * FROM ".concat(User.tableName, " WHERE email=($1)");
                        return [4 /*yield*/, connection.query(sql, [email])];
                    case 2:
                        result = _b.sent();
                        connection.release();
                        if ((_a = result.rows) === null || _a === void 0 ? void 0 : _a.length) {
                            user = result.rows[0];
                            if (bcrypt_1.default.compareSync(password + User.pepper, user.password)) {
                                return [2 /*return*/, user];
                            }
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, null];
                    case 3:
                        err_2 = _b.sent();
                        throw new Error("Connot login, ".concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //Return all users stored in users table
    User.prototype.allUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT id, firstName, lastName, email FROM ".concat(User.tableName);
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Connot get user All users, ".concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //Used to find user information by email 
    User.prototype.findByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT id, firstName, lastName, email from ".concat(User.tableName, " where email=$1");
                        return [4 /*yield*/, connection.query(sql, [email])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        if (result.rows.length === 0) {
                            return [2 /*return*/, false];
                        }
                        else {
                            return [2 /*return*/, true];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Connot get user Information ".concat(email, ", ").concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //Used to find user by user id 
    User.prototype.findUserById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "SELECT id, firstName, lastName, email from ".concat(User.tableName, " where id=($1) ");
                        return [4 /*yield*/, connection.query(sql, [userId])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Connot get user Information ".concat(userId, ", ").concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //Update user information by taking column name, value and user id
    User.prototype.update = function (colName, value, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "UPDATE ".concat(User.tableName, " SET ").concat(colName, "='").concat(value, "' WHERE id=").concat(userId, " RETURNING *");
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_6 = _a.sent();
                        throw new Error("Connot update user, ".concat(err_6));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //Delete user account from database by taking user id
    User.prototype.deleteUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = "DELETE FROM ".concat(User.tableName, " where id=$1 RETURNING *");
                        return [4 /*yield*/, connection.query(sql, [userId])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_7 = _a.sent();
                        throw new Error("Connot delete user ".concat(userId, ", ").concat(err_7));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    User.pepper = process.env.PEPPER;
    User.saltRound = process.env.SALT_ROUND;
    User.tableName = 'users';
    return User;
}());
exports.User = User;
