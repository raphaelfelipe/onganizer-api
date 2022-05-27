import { Router } from "express";
import DonationController from "../controllers/donnations.controller";
import { authToken } from "../middlewares/authToken.middleware";
import { authUUID } from "../middlewares/authUUID.middleware";

const donationRoutes = Router()

const donationController = new DonationController

donationRoutes.get("/:id", authUUID, donationController.donationListOne)
donationRoutes.get("/project/:id", authUUID, donationController.projectDonations)
donationRoutes.get("/user/:id", authUUID, donationController.userDonations)

donationRoutes.use(authToken)
donationRoutes.post("/project/:id", authUUID, donationController.donationCreate)
donationRoutes.patch("/:id", authUUID, donationController.donationUpdate)

export default donationRoutes