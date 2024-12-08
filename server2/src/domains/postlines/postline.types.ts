export interface IPostline {
  postline_id: string;
  name: string;
  description?: string;
  status: "active" | "inactive" | "deleted";
  last_updated: Date;
  user_id: string;
}

export interface IPostlineCreate
  extends Omit<IPostline, "postline_id" | "last_updated"> {}
export interface IPostlineUpdate extends Partial<IPostlineCreate> {}
