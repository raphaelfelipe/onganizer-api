
export interface IProjectCreate {
  name: string;
  description: string;
  objective: string;
  created_at: Date;
  updated_at: Date;
  active: boolean;
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