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
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
function startApp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            server.listen(port, () => {
                console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
            });
        }
        catch (error) {
            console.log("Error with start server");
        }
    });
}
startApp();
