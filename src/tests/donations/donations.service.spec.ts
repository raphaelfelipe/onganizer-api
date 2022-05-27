import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import donationCreateService from "../../services/donations/donationCreate.service";
import donationListOneService from "../../services/donations/donationListOne.service";
import donationUpdateService from "../../services/donations/donationUpdate.service";
import projectDonationsService from "../../services/donations/projectDonationsList.service";
import userDonationsService from "../../services/donations/userDonationList.service";
import projectCreateService from "../../services/projects/projectCreate.service";
import userCreateService from "../../services/users/createUser.service";

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
  const user_email = "test@gmail.com";
  const user_name = "testName";
  const user_password = "HiIamAPassword";
  const user_description = "Test description";
  let user_id : any
  const project_name = "project test"
  const project_description = "project test decription"
  const project_objective = "project test objective"
  let project_id : any
  const message = "testMessage";
  const value = 1;
  let id : any

  test("Should create a new donation in the database", async () => {
    const userData = { email:user_email, name:user_name, password:user_password, description:user_description };
    const userCreate = await userCreateService(userData);
    user_id = userCreate?.id
    const projectData = {user_id, name:project_name, description: project_description, objective: project_objective}
    const projectCreate = await projectCreateService(projectData)
    project_id = projectCreate.id
    const donationData = { project_id, user_id, message, value };
    const donation = await donationCreateService(donationData);
    id = donation?.id;

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
    const donationData = { id };
    const donation = await donationListOneService(donationData);

    expect(donation).toHaveProperty("id");
    expect(donation).toHaveProperty("created_at");
    expect(donation).toEqual(
      expect.objectContaining({
        id,
        value,
        message
      })
    );
  });

  test("Should update a donation message", async () => {
    const message = "UpdatedMessage";
    const donationData = { id, message };
    const donation = await donationUpdateService(donationData);
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
    const donationData = { project_id };
    const donation = await projectDonationsService(donationData);
    expect(donation[0]).toHaveProperty("message");
    expect(donation[0]).toHaveProperty("user_id");
    expect(donation[0]).toHaveProperty("project_id");
  });

  test("Should list all user donations", async () => {
    const donationData = { user_id };
    const donation = await userDonationsService(donationData);
    expect(donation).toHaveLength(1);
  });
});
