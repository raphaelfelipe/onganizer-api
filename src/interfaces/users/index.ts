export interface IUserLogin {
  email: string;
  password: string;
}
export interface IUserCreate {
  email: string;
  name: string;
  description: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  is_admin: boolean;
}
export interface IUpdatedUser {
  id: string;
  email: string;
  password: string;
  name: string;
  description: string;
}
