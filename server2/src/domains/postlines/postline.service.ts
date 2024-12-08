import { PostlineRepository } from "./postline.repository";
import { IPostlineCreate, IPostlineUpdate } from "./postline.types";

export class PostlineService {
  private repository: PostlineRepository;

  constructor() {
    this.repository = new PostlineRepository();
  }

  async getAllPostlines() {
    return this.repository.findAll();
  }

  async getPostline(id: string) {
    const postline = await this.repository.findById(id);
    if (!postline) {
      throw new Error("Postline not found");
    }
    return postline;
  }

  async createPostline(data: IPostlineCreate) {
    return this.repository.create(data);
  }

  async updatePostline(id: string, data: IPostlineUpdate) {
    const postline = await this.repository.update(id, data);
    if (!postline) {
      throw new Error("Postline not found");
    }
    return postline;
  }

  async deletePostline(id: string) {
    const success = await this.repository.delete(id);
    if (!success) {
      throw new Error("Postline not found");
    }
    return { message: "Postline deleted successfully" };
  }
}
