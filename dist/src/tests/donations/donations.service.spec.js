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
const data_source_1 = require("../../data-source");
const donationCreate_service_1 = __importDefault(require("../../services/donations/donationCreate.service"));
const donationListOne_service_1 = __importDefault(require("../../services/donations/donationListOne.service"));
const donationUpdate_service_1 = __importDefault(require("../../services/donations/donationUpdate.service"));
const projectDonationsList_service_1 = __importDefault(require("../../services/donations/projectDonationsList.service"));
const userDonationList_service_1 = __importDefault(require("../../services/donations/userDonationList.service"));
describe("Donation tests", () => {
    let connection;
    let donation_id;
    let donation_value;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((error) => {
            console.log("Error during DataSource initialisation", error);
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("Should create a new donation in the database", () => __awaiter(void 0, void 0, void 0, function* () {
        const project_id = "1";
        const user_id = "1";
        const message = "testMessage";
        const value = 0.1;
        const userData = { project_id, user_id, message, value };
        const donation = yield (0, donationCreate_service_1.default)(userData);
        donation_id = donation === null || donation === void 0 ? void 0 : donation.id;
        donation_value = value;
        expect(donation).toHaveProperty("id");
        expect(donation).toHaveProperty("created_at");
        expect(donation).toEqual(expect.objectContaining({
            user_id,
            project_id,
            value,
            message,
        }));
    }));
    test("Should list a donation by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = donation_id;
        const donationData = { id };
        const donation = yield (0, donationListOne_service_1.default)(donationData);
        expect(donation).toHaveProperty("id");
        expect(donation).toHaveProperty("created_at");
        expect(donation).toEqual(expect.objectContaining({
            id,
        }));
    }));
    test("Should update a donation message", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = donation_id;
        const message = "UpdatedMessage";
        const donationData = { id, message };
        const donation = yield (0, donationUpdate_service_1.default)(donationData);
        const value = donation_value;
        expect(donation.UpdatedInfo).toEqual(expect.objectContaining({
            value,
            message,
        }));
        expect(donation.message).toEqual(expect.stringContaining("Donation successfully updated"));
    }));
    test("Should list all project donations", () => __awaiter(void 0, void 0, void 0, function* () {
        const project_id = "1";
        const donationData = { project_id };
        const donation = yield (0, projectDonationsList_service_1.default)(donationData);
        expect(donation[0]).toHaveProperty("message");
        expect(donation[0]).toHaveProperty("user_id");
        expect(donation[0]).toHaveProperty("project_id");
        expect(donation[0]).toHaveProperty("project");
        expect(donation[0]).toHaveProperty("user");
    }));
    test("Should list all user donations", () => __awaiter(void 0, void 0, void 0, function* () {
        const user_id = "1";
        const donationData = { user_id };
        const donation = yield (0, userDonationList_service_1.default)(donationData);
        expect(donation).toHaveLength(1);
    }));
});
