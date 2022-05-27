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
const project_entity_1 = require("../../entities/project.entity");
const appError_1 = require("../../errors/appError");
const donationCreateService = ({ project_id, user_id, value, message }) => __awaiter(void 0, void 0, void 0, function* () {
    const donationRepository = data_source_1.AppDataSource.getRepository(donation_entity_1.Donation);
    const donations = yield donationRepository.find();
    const projectRepository = data_source_1.AppDataSource.getRepository(project_entity_1.Project);
    const projects = yield projectRepository.find();
    const project = projects.find(project => project.id === project_id);
    if (!project) {
        throw new appError_1.AppError("project not found", 404);
    }
    const donation = new donation_entity_1.Donation();
    donation.project_id = project_id;
    donation.user_id = user_id;
    donation.value = value;
    donation.message = message;
    donationRepository.create(donation);
    yield donationRepository.save(donation);
    return donation;
});
exports.default = donationCreateService;
