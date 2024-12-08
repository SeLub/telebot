import ChannelModel from "./channel.model";
export class ChannelRepository {
    async findAll() {
        return ChannelModel.find();
    }
    async findById(id) {
        return ChannelModel.findOne({ channel_id: id });
    }
    async create(data) {
        return ChannelModel.create({
            ...data,
            channel_id: `ch${Date.now()}`,
        });
    }
    async update(id, data) {
        return ChannelModel.findOneAndUpdate({ channel_id: id }, data, {
            new: true,
        });
    }
    async delete(id) {
        const result = await ChannelModel.deleteOne({ channel_id: id });
        return result.deletedCount > 0;
    }
}
