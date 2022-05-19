export interface IPostCreate {
    project_id:string
    title:string
    content:string
}

export interface ICreateComment {
    user_id: string
    post_id: string
    comment:string
}

export interface ICommentId {
    id:string
}