import { Donation } from "../../entities/donation.entity"
import { AppDataSource } from "../../data-source"
import { IDonationProjectId } from "../../interfaces/donations"
import { AppError } from "../../errors/appError"

const projectDonationsService = async ({ project_id }: IDonationProjectId) => {
    const donationRepository = AppDataSource.getRepository(Donation)

    const donations = await donationRepository.find({
        relations: ["user", "project"]
    })

    const projectDonations = donations.filter((donation) => donation.project_id === project_id)

    if (!projectDonations) {
        throw new AppError("Project donations not found", 404)
    }

    return projectDonations
}

export default projectDonationsService