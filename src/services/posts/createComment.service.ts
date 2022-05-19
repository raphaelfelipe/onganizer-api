import { AppDataSource } from '../../data-source';
import { Post_Comments } from '../../entities/post_comments.entity';
import { ICreateComment } from './../../interfaces/posts/index';
const createCommentService = async({post_id, user_id, comment}:ICreateComment)=>{

    const repository = AppDataSource.getRepository(Post_Comments)

    const commentary = new Post_Comments()
    commentary.post_id = post_id
    commentary.user_id = user_id
    commentary.comment = comment

    repository.create(commentary)
    await repository.save(commentary)

    return commentary


}

export default createCommentService