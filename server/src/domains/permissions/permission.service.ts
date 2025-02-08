import { PermissionRepository } from "./permission.repository";
import { IPermissionCreate, IPermissionUpdate } from "./permission.types";

export class PermissionService {
  private repository: PermissionRepository;

  constructor() {
    this.repository = new PermissionRepository();
  }

  async getAllPermissions() {
    return this.repository.findAll();
  }

  async getPermissionById(id: string) {
    const permission = await this.repository.findById(id);
    if (!permission) {
      throw new Error("Permission not found");
    }
    return permission;
  }

  async getPermissionByCode(code: string) {
    const permission = await this.repository.findByCode(code);
    if (!permission) {
      throw new Error("Permission not found");
    }
    return permission;
  }

  async getPermissionsByResource(resource: string) {
    return this.repository.findByResource(resource);
  }

  async createPermission(data: IPermissionCreate) {
    const existingPermission = await this.repository.findByCode(data.code);
    if (existingPermission) {
      throw new Error("Permission with this code already exists");
    }
    return this.repository.create(data);
  }

  async updatePermission(id: string, data: IPermissionUpdate) {
    const permission = await this.repository.update(id, data);
    if (!permission) {
      throw new Error("Permission not found");
    }
    return permission;
  }

  async deletePermission(id: string) {
    const success = await this.repository.delete(id);
    if (!success) {
      throw new Error("Permission not found");
    }
    return { message: "Permission deleted successfully" };
  }
}
