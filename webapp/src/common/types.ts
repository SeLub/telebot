export interface IPost {
    post_id: string;
    post_text: string;
}

export interface IPhoto {
    photo_id: string;
    post_id_photo: string;
    photo_filename: string;
}

export interface IAttachProps {
    post_id: string;
    attachments: Array<string>;
    setAttachments: () => void;
}
