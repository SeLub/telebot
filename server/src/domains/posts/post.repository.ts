import { IPost, IPostCreate, IPostUpdate } from "./post.types";
import PostModel from "./post.model";

export class PostRepository {
  async findAll(): Promise<IPost[]> {
    return PostModel.find().sort({ created_at: -1 });
  }

  async findByPostline(postlineId: string): Promise<IPost[]> {
    return PostModel.find({ postline_id: postlineId }).sort({ created_at: -1 });
  }

  async findById(id: string): Promise<IPost | null> {
    return PostModel.findOne({ post_id: id });
  }

  async create(data: IPostCreate): Promise<IPost> {
    return PostModel.create({
      ...data,
      post_id: `p${Date.now()}`,
    });
  }

  async update(id: string, data: IPostUpdate): Promise<IPost | null> {
    return PostModel.findOneAndUpdate(
      { post_id: id },
      { ...data, updated_at: new Date() },
      { new: true }
    );
  }

  async delete(id: string): Promise<boolean> {
    const result = await PostModel.deleteOne({ post_id: id });
    return result.deletedCount > 0;
  }
}
