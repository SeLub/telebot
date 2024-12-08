import { ChannelRepository } from "./channel.repository";
export class ChannelService {
    constructor() {
        this.repository = new ChannelRepository();
    }
    async getAllChannels() {
        return this.repository.findAll();
    }
    async getChannel(id) {
        const channel = await this.repository.findById(id);
        if (!channel) {
            throw new Error("Channel not found");
        }
        return channel;
    }
    async createChannel(data) {
        return this.repository.create(data);
    }
    async updateChannel(id, data) {
        const channel = await this.repository.update(id, data);
        if (!channel) {
            throw new Error("Channel not found");
        }
        return channel;
    }
    async deleteChannel(id) {
        const success = await this.repository.delete(id);
        if (!success) {
            throw new Error("Channel not found");
        }
        return { message: "Channel deleted successfully" };
    }
}
