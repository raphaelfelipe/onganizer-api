import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import donationCreateService from "../../services/donations/donationCreate.service";
import donationListOneService from "../../services/donations/donationListOne.service";
import donationUpdateService from "../../services/donations/donationUpdate.service";
import projectDonationsService from "../../services/donations/projectDonationsList.service";
import userDonationsService from "../../services/donations/userDonationList.service";

describe("Donation tests", () => {
  let connection: DataSource;
  let donation_id: any;
  let donation_value: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((error) => {
        console.log("Error during DataSource initialisation", error);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should create a new donation in the database", async () => {
    const project_id = "1";
    const user_id = "1";
    const message = "testMessage";
    const value = 0.1;
    const userData = { project_id, user_id, message, value };
    const donation = await donationCreateService(userData);
    donation_id = donation?.id;
    donation_value = value;

    expect(donation).toHaveProperty("id");
    expect(donation).toHaveProperty("created_at");
    expect(donation).toEqual(
      expect.objectContaining({
        user_id,
        project_id,
        value,
        message,
      })
    );
  });

  test("Should list a donation by id", async () => {
    const id = donation_id;
    const donationData = { id };
    const donation = await donationListOneService(donationData);

    expect(donation).toHaveProperty("id");
    expect(donation).toHaveProperty("created_at");
    expect(donation).toEqual(
      expect.objectContaining({
        id,
      })
    );
  });

  test("Should update a donation message", async () => {
    const id = donation_id;
    const message = "UpdatedMessage";
    const donationData = { id, message };
    const donation = await donationUpdateService(donationData);
    const value = donation_value;
    expect(donation.UpdatedInfo).toEqual(
      expect.objectContaining({
        value,
        message,
      })
    );
    expect(donation.message).toEqual(
      expect.stringContaining("Donation successfully updated")
    );
  });

  test("Should list all project donations", async () => {
    const project_id = "1";
    const donationData = { project_id };
    const donation = await projectDonationsService(donationData);
    expect(donation[0]).toHaveProperty("message");
    expect(donation[0]).toHaveProperty("user_id");
    expect(donation[0]).toHaveProperty("project_id");
    expect(donation[0]).toHaveProperty("project");
    expect(donation[0]).toHaveProperty("user");
  });

  test("Should list all user donations", async () => {
    const user_id = "1";
    const donationData = { user_id };
    const donation = await userDonationsService(donationData);
    expect(donation).toHaveLength(1);
  });
});
