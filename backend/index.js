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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const db_1 = __importDefault(require("./DB/db"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ credentials: true, origin: true }));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: 'welcome' });
}));
app.post('/save_logs', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const obj = req.body;
    yield db_1.default.execute(`INSERT INTO logs (system_type,memory_usage,cpu_type,disk_usage,date_time)
    VALUES ('${obj.system_type}','${obj.memory_usage}','${obj.cpu_type}','${obj.disk_usage}','${obj.date_time}')`);
    res.status(200).json({ message: 'status saved' });
}));
app.get('/get_logs', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield db_1.default.execute(`SELECT * from logs`);
    res.status(200).json(data[0]);
}));
app.listen(process.env.PORT ? +process.env.PORT : 8000);
