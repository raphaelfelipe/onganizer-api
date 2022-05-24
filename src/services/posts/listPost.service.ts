import { Project_Posts } from '../../entities/project_posts.entity';
import { AppDataSource } from "../../data-source"
import { AppError } from '../../errors/appError';

const listPostService = async(id:string)=>{

const repository = AppDataSource.getRepository(Project_Posts)

const posts = await repository.find()

const post = posts.find(post=>post.id === id)

if(!post){
    throw new AppError ("Post not found", 404)
}

return post

}

export default listPostService