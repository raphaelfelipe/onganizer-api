import { Donation } from "../../entities/donation.entity"
import {AppDataSource} from "../../data-source"
import { IDonationUserId } from "../../interfaces/donations"

const userDonationsService = async ({user_id}: IDonationUserId) => {
    const donationsRepository = AppDataSource.getRepository(Donation)

    const donations = await donationsRepository.find()

    const userDonations = donations.filter((donation)=>donation.user_id === user_id)

    return userDonations
}

export default userDonationsService