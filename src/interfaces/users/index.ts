export interface IUserCreate {
  email: string;
  name: string;
  description: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  is_admin: boolean;
}
