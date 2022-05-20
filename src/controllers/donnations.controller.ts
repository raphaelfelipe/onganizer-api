import { Request, Response } from "express";
import donationCreateService from "../services/donations/donationCreate.service";
import donationListOneService from "../services/donations/donationListOne.service";
import donationUpdateService from "../services/donations/donationUpdate.service";
import projectDonationsService from "../services/donations/projectDonationsList.service";
import userDonationsService from "../services/donations/userDonationList.service";

class DonationController {

    async donationCreate (req: Request, res:Response ){
        try{
            const {project_id} = req.params
            const {message,value} = req.body
            const user_id = req.userId

            const donation = await donationCreateService({
                project_id,
                user_id,
                value,
                message
            })

            return res.status(201).json(donation);
        } catch (err) {
            if (err instanceof Error) {
              return res.status(400).send({
                error: err.name,
                message: err.message,
              });
            }
          }
    }

    async donationListOne (req: Request, res:Response ){
        try{
            const {id} = req.params

            const donation = await donationListOneService({
               id
            })

            return res.status(201).json(donation);
        } catch (err) {
            if (err instanceof Error) {
              return res.status(400).send({
                error: err.name,
                message: err.message,
              });
            }
          }
    }

    async donationUpdate (req: Request, res:Response ){
        try{
            const {id} = req.params
            const {message} = req.body

            const donation = await donationUpdateService({
               id,
               message
            })

            return res.status(201).json(donation);
        } catch (err) {
            if (err instanceof Error) {
              return res.status(400).send({
                error: err.name,
                message: err.message,
              });
            }
          }
    }

    async projectDonations (req: Request, res:Response ){
        try{
            const {project_id} = req.params

            const donations = await projectDonationsService({
               project_id
            })

            return res.status(201).json(donations);
        } catch (err) {
            if (err instanceof Error) {
              return res.status(400).send({
                error: err.name,
                message: err.message,
              });
            }
          }
    }

    async userDonations (req: Request, res:Response ){
        try{
            const {user_id} = req.params

            const donations = await userDonationsService({
               user_id
            })

            return res.status(201).json(donations);
        } catch (err) {
            if (err instanceof Error) {
              return res.status(400).send({
                error: err.name,
                message: err.message,
              });
            }
          }
    }
}