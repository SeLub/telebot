import { ChannelRepository } from "./channel.repository";
import { IChannelCreate, IChannelUpdate } from "./channel.types";

export class ChannelService {
  private repository: ChannelRepository;

  constructor() {
    this.repository = new ChannelRepository();
  }

  async getAllChannels() {
    return this.repository.findAll();
  }

  async getChannel(id: string) {
    const channel = await this.repository.findById(id);
    if (!channel) {
      throw new Error("Channel not found");
    }
    return channel;
  }

  async createChannel(data: IChannelCreate) {
    return this.repository.create(data);
  }

  async updateChannel(id: string, data: IChannelUpdate) {
    const channel = await this.repository.update(id, data);
    if (!channel) {
      throw new Error("Channel not found");
    }
    return channel;
  }

  async deleteChannel(id: string) {
    const success = await this.repository.delete(id);
    if (!success) {
      throw new Error("Channel not found");
    }
    return { message: "Channel deleted successfully" };
  }
}
