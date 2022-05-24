import { Donation } from "../../entities/donation.entity"
import {AppDataSource} from "../../data-source"
import { IDonationId } from "../../interfaces/donations"
import { AppError } from "../../errors/appError"

const donationListOneService = async ({id}: IDonationId) => {
    const donationRepository = AppDataSource.getRepository(Donation)

    const donations = await donationRepository.find()

    const donation = donations.find((donation)=>donation.id === id)

    if(!donation){
        throw new AppError("Donation not found", 404)
    }

    return donation
}

export default donationListOneService