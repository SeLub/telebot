export interface IUser {
  _id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  role_ids: string[];
  refresh_token_hash?: string;
  last_login: Date;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IUserCreate extends Omit<IUser, '_id' | 'created_at' | 'updated_at' | 'refresh_token_hash'> {}
export interface IUserUpdate extends Partial<IUserCreate> {}
