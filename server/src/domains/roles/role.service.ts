import { RoleRepository } from "./role.repository";
import { IRole, IRoleCreate, IRoleUpdate } from "./role.types";
import { defaultRoles } from "./role.seeds";

export class RoleService {
  private repository: RoleRepository;

  constructor() {
    this.repository = new RoleRepository();
  }

  async getAllRoles() {
    return this.repository.findAll();
  }

  async getRoleById(id: string) {
    const role = await this.repository.findById(id);
    if (!role) {
      throw new Error("Role not found");
    }
    return role;
  }

  async getRoleByName(name: string) {
    const role = await this.repository.findByName(name);
    if (!role) {
      throw new Error("Role not found");
    }
    return role;
  }

  async getRolesBySubscriptionType(subscriptionType: string) {
    return this.repository.findBySubscriptionType(subscriptionType);
  }

  async createRole(data: Omit<IRole, '_id'>) {
    const existingRole = await this.repository.findByNameAndType(data.name, data.subscription_type);
    if (existingRole) {
        throw new Error("Role with this name already exists for this subscription type");
    }
    return this.repository.create(data);
  }

  async updateRole(id: string, data: IRoleUpdate) {
    const role = await this.repository.update(id, data);
    if (!role) {
      throw new Error("Role not found");
    }
    return role;
  }

  async deleteRole(id: string) {
    const success = await this.repository.delete(id);
    if (!success) {
      throw new Error("Role not found");
    }
    return { message: "Role deleted successfully" };
  }

  async seedDefaultRoles() {
    for (const roleData of defaultRoles) {
      const existingRole = await this.repository.findByName(roleData.name);
      if (!existingRole) {
        await this.repository.create({
          ...roleData,
          subscription_type: roleData.subscription_type as "free" | "personal" | "teams"
        });
      }
    }
  }

  async findByNameAndType(name: string, subscription_type: string) {
    const role = await this.repository.findByNameAndType(name, subscription_type);
    if (!role) {
      throw new Error("Role not found");
    }
    return role;
  }  
}
