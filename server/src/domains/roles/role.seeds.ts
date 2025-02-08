import { Permission } from "./role.types";

export const defaultRoles = [
  {
    name: 'admin',
    permissions: Object.values(Permission),
    subscription_type: 'free'
  },
  {
    name: 'news-editor',
    permissions: [
      Permission.CREATE_POSTLINE,
      Permission.READ_POSTLINE,
      Permission.UPDATE_POSTLINE,
      Permission.CREATE_BOT,
      Permission.READ_BOT,
      Permission.UPDATE_BOT,
      Permission.CREATE_CHANNEL,
      Permission.READ_CHANNEL,
      Permission.UPDATE_CHANNEL
    ],
    subscription_type: 'personal'
  },
  {
    name: 'editor',
    permissions: Object.values(Permission).filter(p => p !== Permission.MANAGE_USERS),
    subscription_type: 'teams'
  },
  {
    name: 'master',
    permissions: [
      Permission.READ_POSTLINE,
      Permission.READ_BOT,
      Permission.READ_CHANNEL,
      Permission.APPROVE_CHANGES
    ],
    subscription_type: 'teams'
  }
];
