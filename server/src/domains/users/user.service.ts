import { UserRepository } from "./user.repository";
import { IUserCreate, IUserUpdate } from "./user.types";
import bcrypt from 'bcrypt';

export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async getAllUsers() {
    return this.repository.findAll();
  }

  async getUserById(id: string) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.repository.findByEmail(email);
    return user; // Remove the error throw, just return null if user not found
  }

  async createUser(data: IUserCreate) {
    const existingUser = await this.repository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Email already registered");
    }
    
    return this.repository.create(data);
  }

  async updateUser(id: string, data: IUserUpdate) {
    if (data.password_hash) {
      data.password_hash = await bcrypt.hash(data.password_hash, 10);
    }
    
    const user = await this.repository.update(id, data);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async findByEmailAndPassword(email: string, password: string) {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }
  
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }
  
    return user;
  }  

  async findByRefreshToken(refreshToken: string) {
    const user = await this.repository.findByRefreshTokenHash(refreshToken);
    if (!user) {
      throw new Error('Invalid refresh token');
    }
    return user;
  }  

  async updateRefreshToken(userId: string, refreshToken: string | null) {
    const refreshTokenHash = refreshToken 
      ? await bcrypt.hash(refreshToken, 10)
      : null;
      
    const user = await this.repository.updateRefreshToken(userId, refreshTokenHash);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async getRefreshToken(userId: string) {
    const user = await this.repository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user.refresh_token_hash;
  }  

  async deleteUser(id: string) {
    const success = await this.repository.delete(id);
    if (!success) {
      throw new Error("User not found");
    }
    return { message: "User deleted successfully" };
  }
}
