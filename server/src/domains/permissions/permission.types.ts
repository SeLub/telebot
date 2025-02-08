export interface IPermission {
  _id: string;
  name: string;
  code: string;
  description: string;
  resource: 'postline' | 'bot' | 'channel' | 'user' | 'system';
  action: 'create' | 'read' | 'update' | 'delete' | 'manage' | 'approve';
}

export interface IPermissionCreate extends Omit<IPermission, '_id'> {}
export interface IPermissionUpdate extends Partial<IPermissionCreate> {}
