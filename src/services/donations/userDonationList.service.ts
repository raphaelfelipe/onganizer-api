import { Donation } from "../../entities/donation.entity"
import { AppDataSource } from "../../data-source"
import { IDonationUserId } from "../../interfaces/donations"
import { AppError } from "../../errors/appError"

const userDonationsService = async ({ user_id }: IDonationUserId) => {
    const donationsRepository = AppDataSource.getRepository(Donation)
    const donations = await donationsRepository.find()
    const userDonations = donations.filter(donation => donation.user_id === user_id)

    if (!userDonations) {
        throw new AppError("User donations not found", 404)
    }

    return userDonations
}

export default userDonationsService