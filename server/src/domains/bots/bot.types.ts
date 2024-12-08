export interface IBot {
  bot_id: string;
  name: string;
  logo_image?: string;
  description?: string;
  bot_token: string;
  user_id: string;
}

export interface IBotCreate extends Omit<IBot, "bot_id"> {}
export interface IBotUpdate extends Partial<IBotCreate> {}
