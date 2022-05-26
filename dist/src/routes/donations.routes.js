"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const donnations_controller_1 = __importDefault(require("../controllers/donnations.controller"));
const authToken_middleware_1 = require("../middlewares/authToken.middleware");
const authUUID_middleware_1 = require("../middlewares/authUUID.middleware");
const donationRoutes = (0, express_1.Router)();
const donationController = new donnations_controller_1.default;
donationRoutes.get("/:id", authUUID_middleware_1.authUUID, donationController.donationListOne);
donationRoutes.get("/project/:id", authUUID_middleware_1.authUUID, donationController.projectDonations);
donationRoutes.get("/user/:id", authUUID_middleware_1.authUUID, donationController.userDonations);
donationRoutes.use(authToken_middleware_1.authToken);
donationRoutes.post("/project/:id", authUUID_middleware_1.authUUID, donationController.donationCreate);
donationRoutes.patch("/:id", authUUID_middleware_1.authUUID, donationController.donationUpdate);
exports.default = donationRoutes;
