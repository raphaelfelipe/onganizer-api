import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import userCreateService from "../../services/users/createUser.service";
import deleteUserService from "../../services/users/deleteUser.service";
import listUserByIdService from "../../services/users/listUserById.service";
import listUsersService from "../../services/users/listUsers.service";
import updateUserService from "../../services/users/updateUser.service";
import userListMeService from "../../services/users/userListMe.service";
import userLoginService from "../../services/users/userLogin.service"


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
  let token : any
  let id : any
  let email = "test@gmail.com";
  let name = "testName";
  const password = "HiIamAPassword";
  let description = "Test description";
  let created_at : any
  let updated_at : any

  test("Should create a new user in the database", async () => {
    const userData = { email, name, password, description };
    const userTest = await userCreateService(userData);
    id = userTest?.id
    created_at = userTest?.created_at
    updated_at = userTest?.updated_at
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
  })
  test("Should make user login", async () => {
    const userData = { email, password };
    const userTest = await userLoginService(userData);
    token = userTest
    expect({token}).toHaveProperty("token");
   
  })
  test("Should list one user", async () => {
    const userTest = await listUserByIdService(id)
    expect(userTest).toEqual(
      expect.objectContaining({
        id,
        name,
        description,
      })
  )})
  test ("Should update the user information", async ()=> {
    name = "test name updated"
    description = "Test description updated"
    email = "test2@gmail.com"
    const userData = {id, email, name, description, password}
    const userTest = await updateUserService(userData)
    
    expect (userTest.UpdatedInfo).toEqual(
      expect.objectContaining({
      name: name,
      email: email,
      password: password,
      description: description,
      }))
      expect (userTest.message).toEqual(
        expect.stringContaining("User successfully updated")
    )
  })

  test("Should list user by email", async () => {
    const userTest = await userListMeService(email)
    expect(userTest).toEqual(
      expect.objectContaining({
        id,
        name,
        description,
        email,
        created_at,
        updated_at
      })
  )})

 
  test("Should list all users", async () => {
    const userTest = await listUsersService()
    expect(userTest.length).toEqual(1)
    expect(userTest[0]).toHaveProperty("id");
    expect(userTest[0]).toHaveProperty("name");
    expect(userTest[0]).toHaveProperty("description");
  })

  test("Should delete user", async () => {
    const userTest = await deleteUserService(id)
    expect (userTest).toEqual(
     true
  )
  })

});

