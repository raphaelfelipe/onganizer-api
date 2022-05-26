import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import projectCreateService from "../../services/projects/projectCreate.service";

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
    const user_id = "1"
    const name = "testName";
    const objective = "None";
    const description = "Test description";
    const userData = {user_id, name, description, objective};
    const userTest = await projectCreateService(userData);

    expect(userTest).toHaveProperty("id");
    expect(userTest).toHaveProperty("created_at");
    expect(userTest).toHaveProperty("updated_at");
    expect(userTest).toEqual(
      expect.objectContaining({
        name,
        description,
        objective
      })
    );
  });
});
