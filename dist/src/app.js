"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = require("./errors/appError");
const express_1 = __importDefault(require("express"));
const posts_routes_1 = __importDefault(require("./routes/posts.routes"));
const project_routes_1 = __importDefault(require("./routes/project.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const donations_routes_1 = __importDefault(require("./routes/donations.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((error, req, res, next) => {
    if (error instanceof appError_1.AppError) {
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message,
        });
    }
    return res.status(500).json({
        status: "error",
        message: "Internal server error",
    });
});
app.use("/users", user_routes_1.default);
app.use("/posts", posts_routes_1.default);
app.use("/project", project_routes_1.default);
app.use("/donations", donations_routes_1.default);
exports.default = app;
