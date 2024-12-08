import { PostRepository } from './post.repository';
import { IPostCreate, IPostUpdate } from './post.types';

export class PostService {
  private repository: PostRepository;

  constructor() {
    this.repository = new PostRepository();
  }

  async getAllPosts() {
    return this.repository.findAll();
  }

  async getPostsByPostline(postlineId: string) {
    return this.repository.findByPostline(postlineId);
  }

  async getPost(id: string) {
    const post = await this.repository.findById(id);
    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  }

  async createPost(data: IPostCreate) {
    return this.repository.create(data);
  }

  async updatePost(id: string, data: IPostUpdate) {
    const post = await this.repository.update(id, data);
    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  }

  async deletePost(id: string) {
    const success = await this.repository.delete(id);
    if (!success) {
      throw new Error('Post not found');
    }
    return { message: 'Post deleted successfully' };
  }
}
