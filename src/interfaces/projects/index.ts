
export interface IProjectCreate {
  user_id: string;
  name: string;
  description: string;
  objective: string;
}

export interface IFollowCreate {
    project_id: string
    user_id: string
}

export interface IProjectId {
    id:string
} 


export interface IProjectUpdate {
  id: string
  name: string;
  description: string;
  objective: string;
  active: boolean;
}