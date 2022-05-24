import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";

import { Donation } from "../entities/donation.entity";
import { AppError } from "../errors/appError";

export const authDonator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const donationRepository = AppDataSource.getRepository(Donation);

    const { id: donationId } = req.params;

    const donations = await donationRepository.find();

    const selectedDonation = donations.find(
      (donation) => donation.id === donationId
    );

    if (selectedDonation?.user_id !== req.userId) {
      throw new AppError("Unauthorised access", 401)
    }

    next();
  } catch (error) {
    throw new AppError("Unauthorised access", 401)
   }
};
