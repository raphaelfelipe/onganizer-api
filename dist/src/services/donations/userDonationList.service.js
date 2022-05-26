"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const donation_entity_1 = require("../../entities/donation.entity");
const data_source_1 = require("../../data-source");
const appError_1 = require("../../errors/appError");
const userDonationsService = ({ user_id }) => __awaiter(void 0, void 0, void 0, function* () {
    const donationsRepository = data_source_1.AppDataSource.getRepository(donation_entity_1.Donation);
    const donations = yield donationsRepository.find({
        relations: ["user", "project"]
    });
    const userDonations = donations.filter((donation) => donation.user_id === user_id);
    if (!userDonations) {
        throw new appError_1.AppError("User donations not found", 404);
    }
    return userDonations;
});
exports.default = userDonationsService;
