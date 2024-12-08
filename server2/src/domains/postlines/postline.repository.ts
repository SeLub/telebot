import { IPostline, IPostlineCreate, IPostlineUpdate } from "./postline.types";
import PostlineModel from "./postline.model";

export class PostlineRepository {
  async findAll(): Promise<IPostline[]> {
    return PostlineModel.find();
  }

  async findById(id: string): Promise<IPostline | null> {
    return PostlineModel.findOne({ postline_id: id });
  }

  async create(data: IPostlineCreate): Promise<IPostline> {
    return PostlineModel.create({
      ...data,
      postline_id: `pl${Date.now()}`,
      last_updated: new Date(),
    });
  }

  async update(id: string, data: IPostlineUpdate): Promise<IPostline | null> {
    return PostlineModel.findOneAndUpdate(
      { postline_id: id },
      { ...data, last_updated: new Date() },
      { new: true }
    );
  }

  async delete(id: string): Promise<boolean> {
    const result = await PostlineModel.deleteOne({ postline_id: id });
    return result.deletedCount > 0;
  }
}
