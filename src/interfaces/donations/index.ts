export interface IDonationId {
    id: string
}

export interface IDonationProjectId {
    project_id: string
}

export interface IDonationCreate {
    project_id: string
    user_id: string
    message:string
    value: number
}