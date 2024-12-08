import { IChannel, IChannelCreate, IChannelUpdate } from "./channel.types";
import ChannelModel from "./channel.model";

export class ChannelRepository {
  async findAll(): Promise<IChannel[]> {
    return ChannelModel.find();
  }

  async findById(id: string): Promise<IChannel | null> {
    return ChannelModel.findOne({ channel_id: id });
  }

  async create(data: IChannelCreate): Promise<IChannel> {
    return ChannelModel.create({
      ...data,
      channel_id: `ch${Date.now()}`,
    });
  }

  async update(id: string, data: IChannelUpdate): Promise<IChannel | null> {
    return ChannelModel.findOneAndUpdate({ channel_id: id }, data, {
      new: true,
    });
  }

  async delete(id: string): Promise<boolean> {
    const result = await ChannelModel.deleteOne({ channel_id: id });
    return result.deletedCount > 0;
  }
}
