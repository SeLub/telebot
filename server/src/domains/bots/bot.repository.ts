import { IBot, IBotCreate, IBotUpdate } from "./bot.types";
import BotModel from "./bot.model";

export class BotRepository {
  async findAll(): Promise<IBot[]> {
    return BotModel.find();
  }

  async findById(id: string): Promise<IBot | null> {
    return BotModel.findOne({ bot_id: id });
  }

  async create(data: IBotCreate): Promise<IBot> {
    return BotModel.create({
      ...data,
      bot_id: `bot${Date.now()}`,
    });
  }

  async update(id: string, data: IBotUpdate): Promise<IBot | null> {
    return BotModel.findOneAndUpdate({ bot_id: id }, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await BotModel.deleteOne({ bot_id: id });
    return result.deletedCount > 0;
  }
}
