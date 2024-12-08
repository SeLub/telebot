import { PostlineRepository } from "./postline.repository";
export class PostlineService {
    constructor() {
        this.repository = new PostlineRepository();
    }
    async getAllPostlines() {
        return this.repository.findAll();
    }
    async getPostline(id) {
        const postline = await this.repository.findById(id);
        if (!postline) {
            throw new Error("Postline not found");
        }
        return postline;
    }
    async createPostline(data) {
        return this.repository.create(data);
    }
    async updatePostline(id, data) {
        const postline = await this.repository.update(id, data);
        if (!postline) {
            throw new Error("Postline not found");
        }
        return postline;
    }
    async deletePostline(id) {
        const success = await this.repository.delete(id);
        if (!success) {
            throw new Error("Postline not found");
        }
        return { message: "Postline deleted successfully" };
    }
}
