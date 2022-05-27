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
const project_entity_1 = require("../../entities/project.entity");
const projectDonationsService = ({ project_id }) => __awaiter(void 0, void 0, void 0, function* () {
    const donationRepository = data_source_1.AppDataSource.getRepository(donation_entity_1.Donation);
    const donations = yield donationRepository.find();
    const projectDonations = donations.filter(donation => donation.project_id === project_id);
    if (!projectDonations) {
        throw new appError_1.AppError("Project donations not found", 404);
    }
    const projectsRepository = data_source_1.AppDataSource.getRepository(project_entity_1.Project);
    const projects = yield projectsRepository.find();
    const project = projects.find(project => project.id === project_id);
    if (!project) {
        throw new appError_1.AppError("Project not found", 404);
    }
    return projectDonations;
});
exports.default = projectDonationsService;
