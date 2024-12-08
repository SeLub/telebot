import PostlineModel from "./postline.model";
export class PostlineRepository {
    async findAll() {
        return PostlineModel.find();
    }
    async findById(id) {
        return PostlineModel.findOne({ postline_id: id });
    }
    async create(data) {
        return PostlineModel.create({
            ...data,
            postline_id: `pl${Date.now()}`,
            last_updated: new Date(),
        });
    }
    async update(id, data) {
        return PostlineModel.findOneAndUpdate({ postline_id: id }, { ...data, last_updated: new Date() }, { new: true });
    }
    async delete(id) {
        const result = await PostlineModel.deleteOne({ postline_id: id });
        return result.deletedCount > 0;
    }
}
