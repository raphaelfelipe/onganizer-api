import { AppDataSource } from '../../data-source';
import { Post_Comments } from '../../entities/post_comments.entity';
import { Project_Posts } from '../../entities/project_posts.entity';
import { AppError } from '../../errors/appError';
import { ICreateComment } from './../../interfaces/posts/index';
const createCommentService = async ({ post_id, user_id, comment }: ICreateComment) => {

    const postsRepository = AppDataSource.getRepository(Post_Comments)
    const posts = await postsRepository.find()
    const post = posts.find(post => post.post_id === post_id)

    const projectPostsRepository = AppDataSource.getRepository(Project_Posts)
    const projectPosts = await projectPostsRepository.find()
    const project = projectPosts.find(project => project.id === post_id)

    if (!project) {
        throw new AppError("Project not found", 404)
    }


    const commentary = new Post_Comments()
    commentary.post_id = post_id
    commentary.user_id = user_id
    commentary.comment = comment

    postsRepository.create(commentary)
    await postsRepository.save(commentary)

    return commentary


}

export default createCommentService