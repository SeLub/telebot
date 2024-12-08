import SubscriptionModel from "./subscription.model";
export class SubscriptionRepository {
    async findAll() {
        return SubscriptionModel.find();
    }
    async findById(id) {
        return SubscriptionModel.findOne({ subscription_id: id });
    }
    async create(data) {
        return SubscriptionModel.create({
            ...data,
            subscription_id: `sub${Date.now()}`,
        });
    }
    async update(id, data) {
        return SubscriptionModel.findOneAndUpdate({ subscription_id: id }, data, {
            new: true,
        });
    }
    async delete(id) {
        const result = await SubscriptionModel.deleteOne({ subscription_id: id });
        return result.deletedCount > 0;
    }
}
