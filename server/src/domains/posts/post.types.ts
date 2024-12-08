interface IMedia {
  type: "image" | "video" | "document" | "audio";
  url: string;
}

export interface IPost {
  post_id: string;
  postline_id: string;
  created_at: Date;
  updated_at: Date;
  text: string;
  media: IMedia[];
}

export interface IPostCreate
  extends Omit<IPost, "post_id" | "created_at" | "updated_at"> {}
export interface IPostUpdate
  extends Partial<Omit<IPost, "post_id" | "created_at" | "updated_at">> {}
