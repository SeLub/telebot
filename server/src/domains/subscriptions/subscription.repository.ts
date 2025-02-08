import {
  ISubscription,
  ISubscriptionCreate,
  ISubscriptionUpdate,
} from "./subscription.types";
import SubscriptionModel from "./subscription.model";

export class SubscriptionRepository {
  async findAll(): Promise<ISubscription[]> {
    return SubscriptionModel.find();
  }

  async findById(id: string): Promise<ISubscription | null> {
    return SubscriptionModel.findOne({ subscription_id: id });
  }

  async create(data: ISubscriptionCreate): Promise<ISubscription> {
    return SubscriptionModel.create({
      ...data,
      subscription_id: `sub${Date.now()}`,
    });
  }

  async update(
    id: string,
    data: ISubscriptionUpdate
  ): Promise<ISubscription | null> {
    return SubscriptionModel.findOneAndUpdate({ subscription_id: id }, data, {
      new: true,
    });
  }

  async delete(id: string): Promise<boolean> {
    const result = await SubscriptionModel.deleteOne({ subscription_id: id });
    return result.deletedCount > 0;
  }

  async findByUserId(userId: string): Promise<ISubscription | null> {
  return SubscriptionModel.findOne({ user_id: userId });
}
}
