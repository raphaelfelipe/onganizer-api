import { AppDataSource } from "../../data-source"
import { Donation } from "../../entities/donation.entity"
import { AppError } from "../../errors/appError"
import { IDonateUpdate } from "../../interfaces/donations"

const donationUpdateService = async({id, message}:IDonateUpdate)=>{
    const donationRepository = AppDataSource.getRepository(Donation)

    const donations = await donationRepository.find()

    const donation = donations.find(donation=>donation.id === id)

    if(!donation){
        throw new AppError("Donation not found", 404)
    }
  
    await donationRepository.update(donation!.id,{message:message})

 

    return {message:'Donation successfully updated', UpdatedInfo:{
        value: donation?.value,
        message: message
    }
    }
}

export default donationUpdateService