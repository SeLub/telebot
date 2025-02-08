import { IPlan } from "./plan.types";
import PlanModel from "./plan.model";

export class PlanRepository {
  async findAll(): Promise<IPlan[]> {
    return PlanModel.find();
  }

  async findById(id: string): Promise<IPlan | null> {
    return PlanModel.findById(id);
  }

  async findByCode(code: string): Promise<IPlan | null> {
    return PlanModel.findOne({ code });
  }

  async findActive(): Promise<IPlan[]> {
    return PlanModel.find({ is_active: true });
  }

  async create(data: Omit<IPlan, '_id'>): Promise<IPlan> {
    return PlanModel.create(data);
  }

  async update(id: string, data: Partial<IPlan>): Promise<IPlan | null> {
    return PlanModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await PlanModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }
}
