import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import userCreateService from "../../services/users/createUser.service";

describe("User creation", () => {
  let connection: DataSource;

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

  test("Should create a new user in the database", async () => {
    const email = "test@gmail.com";
    const name = "testName";
    const password = "HiIamAPassword";
    const description = "Test description";
    const userData = { email, name, password, description };
    const userTest = await userCreateService(userData);

    expect(userTest).toHaveProperty("id");
    expect(userTest).toHaveProperty("created_at");
    expect(userTest).toHaveProperty("updated_at");
    expect(userTest).toEqual(
      expect.objectContaining({
        name,
        description,
        email,
      })
    );
  });
});
