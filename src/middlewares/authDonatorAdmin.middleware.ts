import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Donation } from "../entities/donation.entity";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";

export const authDonatorOrAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const repository = AppDataSource.getRepository(User);
    const users = await repository.find();
    const account = users.find((user) => user.id === req.userId);

    if (account?.is_admin) {
      next();
    }

    const donationRepository = AppDataSource.getRepository(Donation);
    const { id: donationId } = req.params;
    const donations = await donationRepository.find();
    const selectedDonation = donations.find(
      (donation) => donation.id === donationId
    );

    if (selectedDonation?.user_id === req.userId) {
      next();
    } else {
      throw new AppError("Unauthorised access", 401);
    }
  } catch (error) {
    throw new AppError("Unauthorised access", 401);
  }
};
