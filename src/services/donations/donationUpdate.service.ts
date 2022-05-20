import { AppDataSource } from "../../data-source"
import { Donation } from "../../entities/donation.entity"
import { IDonateUpdate } from "../../interfaces/donations"

const donationUpdateService = async({id, message}:IDonateUpdate)=>{
    const donationRepository = AppDataSource.getRepository(Donation)

    const donations = await donationRepository.find()

    const donation = donations.find(donation=>donation.id === id)
  
    await donationRepository.update(donation!.id,{message:message})

 

    return {message:'Donation successfully updated', UpdatedInfo:{
        value: donation?.value,
        message: message
    }
    }
}

export default donationUpdateService