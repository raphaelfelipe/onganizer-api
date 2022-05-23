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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const donationCreate_service_1 = __importDefault(require("../services/donations/donationCreate.service"));
const donationListOne_service_1 = __importDefault(require("../services/donations/donationListOne.service"));
const donationUpdate_service_1 = __importDefault(require("../services/donations/donationUpdate.service"));
const projectDonationsList_service_1 = __importDefault(require("../services/donations/projectDonationsList.service"));
const userDonationList_service_1 = __importDefault(require("../services/donations/userDonationList.service"));
class DonationController {
    donationCreate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { project_id } = req.params;
                const { message, value } = req.body;
                const user_id = req.userId;
                const donation = yield (0, donationCreate_service_1.default)({
                    project_id,
                    user_id,
                    value,
                    message
                });
                return res.status(201).json(donation);
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).send({
                        error: err.name,
                        message: err.message,
                    });
                }
            }
        });
    }
    donationListOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const donation = yield (0, donationListOne_service_1.default)({
                    id
                });
                return res.status(201).json(donation);
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).send({
                        error: err.name,
                        message: err.message,
                    });
                }
            }
        });
    }
    donationUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { message } = req.body;
                const donation = yield (0, donationUpdate_service_1.default)({
                    id,
                    message
                });
                return res.status(201).json(donation);
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).send({
                        error: err.name,
                        message: err.message,
                    });
                }
            }
        });
    }
    projectDonations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { project_id } = req.params;
                const donations = yield (0, projectDonationsList_service_1.default)({
                    project_id
                });
                return res.status(201).json(donations);
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).send({
                        error: err.name,
                        message: err.message,
                    });
                }
            }
        });
    }
    userDonations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = req.params;
                const donations = yield (0, userDonationList_service_1.default)({
                    user_id
                });
                return res.status(201).json(donations);
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).send({
                        error: err.name,
                        message: err.message,
                    });
                }
            }
        });
    }
}
exports.default = DonationController;
