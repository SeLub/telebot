import { IUser, IUserCreate, IUserUpdate } from "./user.types";
import UserModel from "./user.model";

export class UserRepository {
  async findAll(): Promise<IUser[]> {
    return UserModel.find();
  }

  async findById(id: string): Promise<IUser | null> {
    return UserModel.findById(id);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email });
  }

  async create(data: IUserCreate): Promise<IUser> {
    return UserModel.create(data);
  }

  async update(id: string, data: IUserUpdate): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  async updateRefreshToken(id: string, refreshTokenHash: string | null): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(
      id,
      { refresh_token_hash: refreshTokenHash, last_login: new Date() },
      { new: true }
    );
  }

  async delete(id: string): Promise<boolean> {
    const result = await UserModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }

  async findByRefreshTokenHash(refreshToken: string): Promise<IUser | null> {
    return UserModel.findOne({ refresh_token_hash: refreshToken });
  }
}
