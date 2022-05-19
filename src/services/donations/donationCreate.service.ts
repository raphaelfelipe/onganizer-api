import { Donation } from "../../entities/donation.entity";
import { IDonationCreate } from "../../interfaces/donations";
import { AppDataSource } from "../../data-source";

const donationCreateService = async ({project_id, user_id, value, message}: IDonationCreate) =>{
    const donationRepository = AppDataSource.getRepository(Donation)
    const donations = await donationRepository.find()

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