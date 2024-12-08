import PostModel from "./post.model";
export class PostRepository {
    async findAll() {
        return PostModel.find().sort({ created_at: -1 });
    }
    async findByPostline(postlineId) {
        return PostModel.find({ postline_id: postlineId }).sort({ created_at: -1 });
    }
    async findById(id) {
        return PostModel.findOne({ post_id: id });
    }
    async create(data) {
        return PostModel.create({
            ...data,
            post_id: `p${Date.now()}`,
        });
    }
    async update(id, data) {
        return PostModel.findOneAndUpdate({ post_id: id }, { ...data, updated_at: new Date() }, { new: true });
    }
    async delete(id) {
        const result = await PostModel.deleteOne({ post_id: id });
        return result.deletedCount > 0;
    }
}
