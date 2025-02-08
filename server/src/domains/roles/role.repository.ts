import { IRole, IRoleCreate, IRoleUpdate } from "./role.types";
import RoleModel from "./role.model";

export class RoleRepository {
  async findAll(): Promise<IRole[]> {
    return RoleModel.find();
  }

  async findById(id: string): Promise<IRole | null> {
    return RoleModel.findById(id);
  }

  async findByName(name: string): Promise<IRole | null> {
    return RoleModel.findOne({ name });
}

  async findBySubscriptionType(subscriptionType: string): Promise<IRole[]> {
    return RoleModel.find({ subscription_type: subscriptionType });
  }

  async create(data: IRoleCreate): Promise<IRole> {
    return RoleModel.create(data);
  }

  async update(id: string, data: IRoleUpdate): Promise<IRole | null> {
    return RoleModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await RoleModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }

  async findByNameAndType(name: string, subscription_type: string): Promise<IRole | null> {
    return RoleModel.findOne({ name, subscription_type });
}

}

