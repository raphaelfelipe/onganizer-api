import { AppDataSource } from "../../data-source";
import { Project_Posts } from "../../entities/project_posts.entity";
import { IPostId } from "../../interfaces/posts";

const postDeleteService = async ({id}: IPostId) => {
  const postsRepository = AppDataSource.getRepository(Project_Posts);

  const posts = await postsRepository.find();

  const postDeleted = posts.find((posts) => posts.id === id);

  await postsRepository.delete(postDeleted!.id);

  return true;
};

export default postDeleteService;
