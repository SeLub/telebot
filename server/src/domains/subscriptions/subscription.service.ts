import { SubscriptionRepository } from "./subscription.repository";
import { ISubscriptionCreate, ISubscriptionUpdate } from "./subscription.types";

export class SubscriptionService {
  private repository: SubscriptionRepository;

  constructor() {
    this.repository = new SubscriptionRepository();
  }

  async getAllSubscriptions() {
    return this.repository.findAll();
  }

  async getSubscription(id: string) {
    const subscription = await this.repository.findById(id);
    if (!subscription) {
      throw new Error("Subscription not found");
    }
    return subscription;
  }

  async createSubscription(data: ISubscriptionCreate) {
    return this.repository.create(data);
  }

  async updateSubscription(id: string, data: ISubscriptionUpdate) {
    const subscription = await this.repository.update(id, data);
    if (!subscription) {
      throw new Error("Subscription not found");
    }
    return subscription;
  }

  async deleteSubscription(id: string) {
    const success = await this.repository.delete(id);
    if (!success) {
      throw new Error("Subscription not found");
    }
    return { message: "Subscription deleted successfully" };
  }
}
