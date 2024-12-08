import BotModel from "./bot.model";
export class BotRepository {
    async findAll() {
        return BotModel.find();
    }
    async findById(id) {
        return BotModel.findOne({ bot_id: id });
    }
    async create(data) {
        return BotModel.create({
            ...data,
            bot_id: `bot${Date.now()}`,
        });
    }
    async update(id, data) {
        return BotModel.findOneAndUpdate({ bot_id: id }, data, { new: true });
    }
    async delete(id) {
        const result = await BotModel.deleteOne({ bot_id: id });
        return result.deletedCount > 0;
    }
}
