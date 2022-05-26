import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import commentDeleteService from "../../services/posts/commentDelete.service";
import createCommentService from "../../services/posts/createComment.service";
import listAllPostCommentariesService from "../../services/posts/listAllPostCommentaries.service";
import listCommentByIdService from "../../services/posts/listCommentById.service";
import listPostService from "../../services/posts/listPost.service";
import postCommentUpdateService from "../../services/posts/postCommentsUpdate.service";
import postDeleteService from "../../services/posts/postDelete.service";
import postUpdateService from "../../services/posts/postUpdate.service";
import followProjectService from "../../services/projects/followProject.service";
import deleteFollowService from "../../services/projects/followProjectDelete.service";
import projectPostsService from "../../services/projects/listProjectPosts.service";
import postCreateService from "../../services/projects/postCreate.service";
import projectCreateService from "../../services/projects/projectCreate.service";
import userCreateService from "../../services/users/createUser.service";
import userListMeFeedService from "../../services/users/userListMeFeed.service";


describe("posts tests", () => {
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
  const user_email = "test@gmail.com";
  const user_name = "testName";
  const user_password = "HiIamAPassword";
  const user_description = "Test description";
  let user_id : any
  const project_name = "project test"
  const project_description = "project test decription"
  const project_objective = "project test objective"
  let project_id : any
  let title = "Post title test"
  let content = "Post content test"
  let id : any
  let comment = "test commentary"
  let comment_id: any

  test("Should create a new post in the database", async () => {

    const userData = { email:user_email, name:user_name, password:user_password, description:user_description };
    const userCreate = await userCreateService(userData);
    user_id = userCreate?.id
    const projectData = {user_id, name:project_name, description: project_description, objective: project_objective}
    const projectCreate = await projectCreateService(projectData)
    project_id = projectCreate.id
    const postData = {project_id, title, content}
    const testData = await postCreateService(postData)
    id = testData.id
    expect(testData).toHaveProperty("id");
    expect(testData).toHaveProperty("created_at");
    expect(testData).toHaveProperty("updated_at");
    expect(testData).toHaveProperty("project");
    expect(testData).toEqual(
      expect.objectContaining({
        title,
        content,
      })
    );
  });

  test("Should list post by id", async ()=>{
      const testData = await listPostService(id)
      expect(testData).toHaveProperty("id");
      expect(testData).toHaveProperty("created_at");
      expect(testData).toHaveProperty("updated_at");
      expect(testData).toEqual(
        expect.objectContaining({
          title,
          content,
        })
      );
  })

  test("Should list all posts", async()=>{
    const postData = {project_id, title, content}
    await postCreateService(postData)
    const testData = await projectPostsService({id : project_id})
    expect(testData[0]).toHaveProperty("id");
    expect(testData[0]).toHaveProperty("created_at");
    expect(testData[0]).toHaveProperty("updated_at");
    expect(testData[0]).toEqual(
      expect.objectContaining({
        title,
        content,
      })
    );
    expect(testData.length).toEqual(2)
  })

  test("User should be able to follow a project", async()=>{
  
      const testData = await followProjectService({project_id, user_id})
      expect(testData).toHaveProperty("id");
      expect(testData).toEqual(
        expect.objectContaining({
          user_id,
          project_id,
        })
      );
  })

  test("Should list post by projects the user follows",async()=>{
  
    const testData = await userListMeFeedService(user_id)
    expect(testData[0]).toHaveProperty("id");
    expect(testData[0]).toHaveProperty("created_at");
    expect(testData[0]).toHaveProperty("updated_at");
    expect(testData[0]).toEqual(
      expect.objectContaining({
        title,
        content,
      })
    );
    expect(testData.length).toEqual(2)
})

test("User should be able to unfollow a project", async()=>{
    const testData = await deleteFollowService({project_id, user_id})
    expect(testData).toEqual(true)
})

test("User should be able to make a comment on a post", async()=>{
    const commentaryData = {post_id:id, user_id, comment}
    const testData = await createCommentService(commentaryData)
    comment_id = testData.id
    expect(testData).toHaveProperty("id");
    expect(testData).toHaveProperty("created_at");
    expect(testData).toHaveProperty("updated_at");
    expect(testData).toEqual(
      expect.objectContaining({
        user_id,
        post_id:id,
        comment,
      })
    );
})

test("User should be able to make a comment on a post", async()=>{
    const commentaryData = {post_id:id, user_id, comment:"teste 2"}
    const newComment = await createCommentService(commentaryData)

    const testData = await listAllPostCommentariesService (id)

    expect(testData[0]).toHaveProperty("id");
    expect(testData[0]).toHaveProperty("created_at");
    expect(testData[0]).toHaveProperty("updated_at");
    expect(testData[0]).toEqual(
      expect.objectContaining({
        user_id,
        post_id:id,
        comment,
      })
    );
    expect(testData.length).toEqual(2)
})

test("Should list comment by id", async ()=>{
    const testData = await listCommentByIdService(comment_id)
    expect(testData).toHaveProperty("id");
    expect(testData).toHaveProperty("created_at");
    expect(testData).toHaveProperty("updated_at");
    expect(testData).toEqual(
      expect.objectContaining({
        comment
      })
    );
})

test("User should be able to update a comment", async()=>{
    comment = "test commentary updated"
    const commentaryData = {id: comment_id, comment}
    const testData = await postCommentUpdateService(commentaryData)

    expect(testData.UpdatedInfo).toEqual(
      expect.objectContaining({
        comment,
      })
    );
    expect(testData.message).toEqual('Comment successfully updated')
})

test("User should be able to delete a comment", async()=>{
    const commentaryData = {id: comment_id}
    const testData = await commentDeleteService(commentaryData)

    expect(testData).toEqual(
      true
    );
})

test("User should be able to update a post", async()=>{
    title = "Post title test"
    content = "Post content test"
    const postData = {id,title, content}
    const testData = await postUpdateService(postData)
    console.log(testData)
    expect(testData.UpdatedInfo).toEqual(
      expect.objectContaining({
        title,
        content
      })
    );
    expect(testData.message).toEqual("Post successfully updated")
})


test("User should be able to delete a post", async()=>{

    const testData = await postDeleteService({id})

    expect(testData).toEqual(
      true
    );
})
});
