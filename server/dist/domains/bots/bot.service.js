import { BotRepository } from "./bot.repository";
export class BotService {
    constructor() {
        this.repository = new BotRepository();
    }
    async getAllBots() {
        return this.repository.findAll();
    }
    async getBot(id) {
        const bot = await this.repository.findById(id);
        if (!bot) {
            throw new Error("Bot not found");
        }
        return bot;
    }
    async createBot(data) {
        return this.repository.create(data);
    }
    async updateBot(id, data) {
        const bot = await this.repository.update(id, data);
        if (!bot) {
            throw new Error("Bot not found");
        }
        return bot;
    }
    async deleteBot(id) {
        const success = await this.repository.delete(id);
        if (!success) {
            throw new Error("Bot not found");
        }
        return { message: "Bot deleted successfully" };
    }
}
