import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";

import { Donation } from "../entities/donation.entity";

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
      throw new Error();
    }

    next();
  } catch (err) {
    return res.status(401).json({
      message: "You are not allowed to do that on this donation",
    });
  }
};
