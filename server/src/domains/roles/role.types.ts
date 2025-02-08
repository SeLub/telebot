export enum Permission {
  CREATE_POSTLINE = 'create:postline',
  READ_POSTLINE = 'read:postline',
  UPDATE_POSTLINE = 'update:postline',
  DELETE_POSTLINE = 'delete:postline',
  
  CREATE_BOT = 'create:bot',
  READ_BOT = 'read:bot',
  UPDATE_BOT = 'update:bot',
  DELETE_BOT = 'delete:bot',
  
  CREATE_CHANNEL = 'create:channel',
  READ_CHANNEL = 'read:channel',
  UPDATE_CHANNEL = 'update:channel',
  DELETE_CHANNEL = 'delete:channel',
  
  MANAGE_USERS = 'manage:users',
  APPROVE_CHANGES = 'approve:changes'
}

export interface IRole {
  _id: string;
  name: string;
  permissions: string[];
  subscription_type: 'free' | 'personal' | 'teams';
}

export type IRoleCreate = Omit<IRole, '_id'>;
export type IRoleUpdate = Partial<IRoleCreate>;
