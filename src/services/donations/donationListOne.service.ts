import { Donation } from "../../entities/donation.entity"
import {AppDataSource} from "../../data-source"
import { IDonationId } from "../../interfaces/donations"

const donationListOneService = async ({id}: IDonationId) => {
    const donationRepository = AppDataSource.getRepository(Donation)

    const donations = await donationRepository.find()

    const donation = donations.find((donation)=>donation.id === id)

    return donation
}

export default donationListOneService