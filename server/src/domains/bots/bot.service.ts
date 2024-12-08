import { BotRepository } from "./bot.repository";
import { IBotCreate, IBotUpdate } from "./bot.types";

export class BotService {
  private repository: BotRepository;

  constructor() {
    this.repository = new BotRepository();
  }

  async getAllBots() {
    return this.repository.findAll();
  }

  async getBot(id: string) {
    const bot = await this.repository.findById(id);
    if (!bot) {
      throw new Error("Bot not found");
    }
    return bot;
  }

  async createBot(data: IBotCreate) {
    return this.repository.create(data);
  }

  async updateBot(id: string, data: IBotUpdate) {
    const bot = await this.repository.update(id, data);
    if (!bot) {
      throw new Error("Bot not found");
    }
    return bot;
  }

  async deleteBot(id: string) {
    const success = await this.repository.delete(id);
    if (!success) {
      throw new Error("Bot not found");
    }
    return { message: "Bot deleted successfully" };
  }
}
