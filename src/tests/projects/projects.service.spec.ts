import { stringify } from "querystring";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import projectCreateService from "../../services/projects/projectCreate.service";
import projectDeleteSelfService from "../../services/projects/projectDelete.service";
import projectListService from "../../services/projects/projectList.service";
import projectListOneService from "../../services/projects/projectListOne.service";
import projectUpdateService from "../../services/projects/projectUpdate.service";
import projectUsersService from "../../services/projects/projectUsers.service";
import userProjectCreateService from "../../services/projects/projectUsersCreate.service";
import userCreateService from "../../services/users/createUser.service";

describe("Project tests", () => {
  let connection: DataSource;
  let user_id_test: any;
  let project_id_test: any;
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
    user_id_test = userTest?.id;
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

  test("Should create a new project in the database", async () => {
    const user_id = user_id_test;
    const name = "testName";
    const objective = "None";
    const description = "Test description";
    const userData = { user_id, name, description, objective };
    const projectTest = await projectCreateService(userData);
    project_id_test = projectTest?.id;
    expect(projectTest).toHaveProperty("id");
    expect(projectTest).toHaveProperty("created_at");
    expect(projectTest).toHaveProperty("updated_at");
    expect(projectTest).toEqual(
      expect.objectContaining({
        name,
        description,
        objective,
      })
    );
  });

  test("Should list one project by id", async () => {
    const id = project_id_test;
    const projectData = { id };
    const projectTest = await projectListOneService(projectData);
    expect(projectTest).toHaveProperty("id");
    expect(projectTest).toHaveProperty("objective");
    expect(projectTest).toHaveProperty("name");
    expect(projectTest).toHaveProperty("description");
    expect(projectTest).toHaveProperty("created_at");
    expect(projectTest).toHaveProperty("updated_at");
    expect(projectTest).toHaveProperty("active");
  });

  test("Should list all projects", async () => {
    const projectTest = await projectListService();
    expect(projectTest).toHaveLength(1);
  });

  test("Should update one project", async () => {
    const name = "Updated project name";
    const active = true;
    const objective = "Test objective update";
    const description = "Test description update";
    const id = project_id_test;
    const projectData = { id, active, objective, name, description };
    const projectTest = await projectUpdateService(projectData);
    expect(projectTest.UpdatedInfo).toEqual(
      expect.objectContaining({
        name,
        active,
        objective,
        description,
      })
    );
    expect(projectTest.message).toEqual(
      expect.stringContaining("Project successfully updated")
    );
  });

  test("Should list all project users", async () => {
    const id = project_id_test;
    const projectData = { id };
    const projectTest = await projectUsersService(projectData);
    expect(projectTest?.users).toHaveLength(1);
  });

  test("Should create a new project user", async () => {
    const project_id = project_id_test;

    const email = "test2@gmail.com";
    const name = "testName2";
    const password = "HiIamAPassword2";
    const description = "Test description 2";
    const userData = { email, name, password, description };
    const userTest = await userCreateService(userData);
    const user_id = userTest!.id;
    const newUserData = { project_id, user_id};
    const projectTest = await userProjectCreateService(newUserData);
    expect(projectTest!.users.length).toEqual(2);
    expect(projectTest).toHaveProperty("users");
    expect(projectTest!.users[1]).toEqual(
      expect.objectContaining({
        id: user_id,
        name,
        email,
        description
      })
    )
  });


  test("Should list all project users", async () => {
    const project_id = project_id_test;
    const projectData = { id:project_id};
    const projectTest = await projectUsersService(projectData);
    expect(projectTest?.users).toHaveLength(2);
  });

  test("Should delete one project", async () => {
    const id = project_id_test;
    const projectData = id;
    const projectTest = await projectDeleteSelfService(projectData);
    expect(projectTest).toBe(true);
  });
});
