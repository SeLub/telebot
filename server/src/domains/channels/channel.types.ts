export interface IChannel {
  channel_id: string;
  name: string;
  logo_image?: string;
  description?: string;
  members_count: number;
  language: string;
  user_id: string;
}

export interface IChannelCreate extends Omit<IChannel, "channel_id"> {}
export interface IChannelUpdate extends Partial<IChannelCreate> {}
