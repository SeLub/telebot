export interface IPost {
    post_id: string;
    post_text: string;
}

export interface IAttachment {
    attachment_id: string;
    post_id_attachment: string;
    attachment_filename: string;
}

export interface IAttachmentsProps {
    post_id: string;
    attachments: Array<IAttachment>;
    // eslint-disable-next-line no-unused-vars
    setAttachments: (attachments: Array<IAttachment>) => void;
}

export interface ICurrentAttachmentsProps {
    attachments: Array<IAttachment>;
    // eslint-disable-next-line no-unused-vars
    deleteAttachment: (attachment: IAttachment) => void;
}

export interface IPublishers {
    publisher_id: string;
    publisher_name: string;
    publisher_bots: string;
    publisher_channels: string;
    publisher_database: string;
}

export interface IPostlines {
    database_id: string;
    database_name: string;
}

export interface IChannels {
    channel_id?: string;
    channel_name: string;
    channel_chat_id: string;
    channel_url: string;
}

export interface IBots {
    bot_id?: string;
    bot_name: string;
    bot_token: string;
}
