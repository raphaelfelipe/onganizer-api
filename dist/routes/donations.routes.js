"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const donnations_controller_1 = __importDefault(require("../controllers/donnations.controller"));
const donationRoutes = (0, express_1.Router)();
const donationController = new donnations_controller_1.default;
donationRoutes.get("/:id", donationController.donationListOne);
donationRoutes.get("/project/:id", donationController.projectDonations);
donationRoutes.get("/user/:id", donationController.userDonations);
donationRoutes.post("/project/:id", donationController.donationCreate);
donationRoutes.patch("/:id", donationController.donationUpdate);
exports.default = donationRoutes;
