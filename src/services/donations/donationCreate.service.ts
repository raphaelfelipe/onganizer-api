import { Donation } from "../../entities/donation.entity";
import { IDonationCreate } from "../../interfaces/donations";
import { AppDataSource } from "../../data-source";
import { Project } from "../../entities/project.entity";
import { AppError } from "../../errors/appError";

const donationCreateService = async ({ project_id, user_id, value, message }: IDonationCreate) => {
    const donationRepository = AppDataSource.getRepository(Donation)
    const donations = await donationRepository.find()

    const projectRepository = AppDataSource.getRepository(Project)
    const projects = await projectRepository.find()
    const project = projects.find(project => project.id === project_id)

    if (!project) {
        throw new AppError("project not found", 404)
    }

    const donation = new Donation()
    donation.project_id = project_id
    donation.user_id = user_id
    donation.value = value
    donation.message = message


    donationRepository.create(donation)
    await donationRepository.save(donation)

    return donation
}

export default donationCreateService