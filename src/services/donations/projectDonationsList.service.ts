import { Donation } from "../../entities/donation.entity"
import {AppDataSource} from "../../data-source"
import { IDonationProjectId } from "../../interfaces/donations"

const projectDonationsService = async ({project_id}: IDonationProjectId) => {
    const donationRepository = AppDataSource.getRepository(Donation)

    const donations = await donationRepository.find()

    const projectDonations = donations.filter((donation)=>donation.project_id === project_id)

    return projectDonations
}

export default projectDonationsService