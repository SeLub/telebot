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

  async findByUserId(userId: string) {
    const subscription = await this.repository.findByUserId(userId);
    if (!subscription) {
      throw new Error("Subscription not found");
    }
    return subscription;
  }  

  async createSubscription(data: ISubscriptionCreate) {
    const maxUsers = this.getMaxUsersByPlan(data.plan);
    const features = this.getFeaturesByPlan(data.plan);
    
    return this.repository.create({
      ...data,
      max_users: maxUsers,
      features
    });
  }

  async updateSubscription(id: string, data: ISubscriptionUpdate) {
    if (data.plan) {
      data.max_users = this.getMaxUsersByPlan(data.plan);
      data.features = this.getFeaturesByPlan(data.plan);
    }

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

  private getMaxUsersByPlan(plan: string): number | null {
    const maxUsers: { [key: string]: number | null } = {
      free: 1,
      personal: 5,
      teams: null
    };
    return maxUsers[plan];
  }

    private getFeaturesByPlan(plan: string): string[] {
      const features = {
        free: ['basic_posting'],
        personal: ['basic_posting', 'advanced_editing'],
        teams: ['basic_posting', 'advanced_editing', 'approval_workflow']
      };
      return features[plan as keyof typeof features] || [];
    }
}
