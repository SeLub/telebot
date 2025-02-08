import { PlanRepository } from "./plan.repository";
import { IPlan } from "./plan.types";

export class PlanService {
  private repository: PlanRepository;

  constructor() {
    this.repository = new PlanRepository();
  }

  async getAllPlans() {
    return this.repository.findAll();
  }

  async getActivePlans() {
    return this.repository.findActive();
  }

  async getPlanById(id: string) {
    const plan = await this.repository.findById(id);
    if (!plan) {
      throw new Error("Plan not found");
    }
    return plan;
  }

  async getPlanByCode(code: string) {
    const plan = await this.repository.findByCode(code);
    if (!plan) {
      throw new Error("Plan not found");
    }
    return plan;
  }

  async createPlan(data: Omit<IPlan, '_id'>) {
    const existingPlan = await this.repository.findByCode(data.code);
    if (existingPlan) {
      throw new Error("Plan with this code already exists");
    }
    
    // Set default max_users based on plan type
    if (!data.max_users) {
      data.max_users = this.getDefaultMaxUsers(data.code);
    }
    
    return this.repository.create(data);
  }

  private getDefaultMaxUsers(planCode: string): number | null {
    const defaults: { [key: string]: number | null } = {
      free: 1,
      personal: 5,
      teams: null
    };
    return defaults[planCode] ?? null;
  }

  async updatePlan(id: string, data: Partial<IPlan>) {
    const plan = await this.repository.update(id, data);
    if (!plan) {
      throw new Error("Plan not found");
    }
    return plan;
  }

  async deletePlan(id: string) {
    const success = await this.repository.delete(id);
    if (!success) {
      throw new Error("Plan not found");
    }
    return { message: "Plan deleted successfully" };
  }
}