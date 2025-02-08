import { IPermission, IPermissionCreate, IPermissionUpdate } from "./permission.types";
import PermissionModel from "./permission.model";

export class PermissionRepository {
  async findAll(): Promise<IPermission[]> {
    return PermissionModel.find();
  }

  async findById(id: string): Promise<IPermission | null> {
    return PermissionModel.findById(id);
  }

  async findByCode(code: string): Promise<IPermission | null> {
    return PermissionModel.findOne({ code });
  }

  async findByResource(resource: string): Promise<IPermission[]> {
    return PermissionModel.find({ resource });
  }

  async create(data: IPermissionCreate): Promise<IPermission> {
    return PermissionModel.create(data);
  }

  async update(id: string, data: IPermissionUpdate): Promise<IPermission | null> {
    return PermissionModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await PermissionModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }
}
