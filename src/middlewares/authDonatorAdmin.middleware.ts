import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Donation } from "../entities/donation.entity"
import { User } from "../entities/user.entity"

export const authDonatorOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try{

        const repository = AppDataSource.getRepository(User)
        const users = await repository.find()
        const account = users.find(user => user.id === req.userId)

        if(account?.is_admin){
            next()
        }

        const donationRepository = AppDataSource.getRepository(Donation);
        const { id: donationId } = req.params;
        const donations = await donationRepository.find();
        const selectedDonation = donations.find((donation) => donation.id === donationId);

        if (selectedDonation?.user_id === req.userId) {
            next();
        }else{
            throw new Error();
        }

    }catch(err){
        return res.status(401).json({
            message: "You are not an admin and you are not allowed to do that on this donation"
        })
    }
}