import { Donation } from "../../entities/donation.entity"
import { AppDataSource } from "../../data-source"
import { IDonationProjectId } from "../../interfaces/donations"
import { AppError } from "../../errors/appError"
import { Project } from "../../entities/project.entity"

const projectDonationsService = async ({ project_id }: IDonationProjectId) => {
    const donationRepository = AppDataSource.getRepository(Donation)
    const donations = await donationRepository.find()
    const projectDonations = donations.filter(donation => donation.project_id === project_id)

    if (!projectDonations) {
        throw new AppError("Project donations not found", 404)
    }

    const projectsRepository = AppDataSource.getRepository(Project)
    const projects = await projectsRepository.find()
    const project = projects.find(project => project.id === project_id)

    if (!project) {
        throw new AppError("Project not found", 404)
    }

    return projectDonations
}

export default projectDonationsService