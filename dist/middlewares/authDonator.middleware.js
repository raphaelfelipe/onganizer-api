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
exports.authDonator = void 0;
const data_source_1 = require("../data-source");
const donation_entity_1 = require("../entities/donation.entity");
const authDonator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const donationRepository = data_source_1.AppDataSource.getRepository(donation_entity_1.Donation);
        const { id: donationId } = req.params;
        const donations = yield donationRepository.find();
        const selectedDonation = donations.find((donation) => donation.id === donationId);
        if ((selectedDonation === null || selectedDonation === void 0 ? void 0 : selectedDonation.user_id) !== req.userId) {
            throw new Error();
        }
        next();
    }
    catch (err) {
        return res.status(401).json({
            message: "You are not allowed to do that on this donation",
        });
    }
});
exports.authDonator = authDonator;
