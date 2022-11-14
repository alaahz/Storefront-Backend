"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./components/routes"));
var dotenv_1 = __importDefault(require("dotenv"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.get('/', function (req, res) {
    res.status(200).send('Welcome to Storefront Back Project');
});
routes_1.default.api(app);
app.get('*', function (req, res) {
    res.status(404).send('Page not fount');
});
app.listen(port, function () {
    console.log("listening on port ".concat(port));
});
exports.default = app;
