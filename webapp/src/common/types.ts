export interface IPost {
    post_id: string;
    post_text: string;
}

export interface IAttachment {
    photo_id: string;
    post_id_photo: string;
    photo_filename: string;
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
}

export interface IDatabases {
    database_id: string;
    database_name: string;
}
