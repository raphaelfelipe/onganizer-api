import { Router } from "express";
import DonationController from "../controllers/donnations.controller";

const donationRoutes = Router()

const donationController = new DonationController

donationRoutes.get("/:id", donationController.donationListOne)
donationRoutes.get("/project/:id", donationController.projectDonations)
donationRoutes.get("/user/:id", donationController.userDonations)

donationRoutes.post("/project/:id", donationController.donationCreate)

donationRoutes.patch("/:id", donationController.donationUpdate)

export default donationRoutes