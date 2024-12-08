import { SubscriptionRepository } from "./subscription.repository";
export class SubscriptionService {
    constructor() {
        this.repository = new SubscriptionRepository();
    }
    async getAllSubscriptions() {
        return this.repository.findAll();
    }
    async getSubscription(id) {
        const subscription = await this.repository.findById(id);
        if (!subscription) {
            throw new Error("Subscription not found");
        }
        return subscription;
    }
    async createSubscription(data) {
        return this.repository.create(data);
    }
    async updateSubscription(id, data) {
        const subscription = await this.repository.update(id, data);
        if (!subscription) {
            throw new Error("Subscription not found");
        }
        return subscription;
    }
    async deleteSubscription(id) {
        const success = await this.repository.delete(id);
        if (!success) {
            throw new Error("Subscription not found");
        }
        return { message: "Subscription deleted successfully" };
    }
}
