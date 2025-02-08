import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../../common/config';
import { UserService } from '../users/user.service';
import { SubscriptionService } from '../subscriptions/subscription.service';
import { RoleService } from '../roles/role.service';
import { PlanService } from '../plans/plan.service';
import { IAuthRegisterInput, IAuthLoginInput, IAuthResponse, JWTPayload } from './auth.types';

export class AuthService {
  private userService: UserService;
  private subscriptionService: SubscriptionService;
  private roleService: RoleService;
  private planService: PlanService;

  constructor() {
    this.userService = new UserService();
    this.subscriptionService = new SubscriptionService();
    this.roleService = new RoleService();
    this.planService = new PlanService();
  }

  private generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, JWT_SECRET, { 
      expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] 
    });
  }

  async register(userData: IAuthRegisterInput): Promise<IAuthResponse> {
    const existingUser = await this.userService.getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const freePlan = await this.planService.getPlanByCode('free');
    const adminRole = await this.roleService.findByNameAndType('admin', 'free');
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await this.userService.createUser({
      email: userData.email,
      password_hash: hashedPassword,
      first_name: userData.name.split(' ')[0],
      last_name: userData.name.split(' ').slice(1).join(' '),
      role_ids: [adminRole._id],
      is_active: true,
      last_login: new Date()
    });

    const subscription = await this.subscriptionService.createSubscription({
      user_id: user._id,
      plan: freePlan.code,
      start_date: new Date(),
      end_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      max_users: freePlan.max_users,
      features: freePlan.features
    });

    const refreshToken = Buffer.from(crypto.getRandomValues(new Uint8Array(40))).toString('hex');
    await this.userService.updateRefreshToken(user._id, refreshToken);

    const token = this.generateToken({
      userId: user._id,
      subscriptionId: subscription.subscription_id,
      roleIds: user.role_ids
    });

    return { 
      user: {
        _id: user._id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
      }, 
      subscription: {
        subscription_id: subscription.subscription_id,
        plan: subscription.plan,
        features: subscription.features
      },
      token,
      refreshToken 
    };
  }

  async login(credentials: IAuthLoginInput): Promise<IAuthResponse> {
    const user = await this.userService.findByEmailAndPassword(
      credentials.email, 
      credentials.password
    );
    
    const subscription = await this.subscriptionService.findByUserId(user._id);
    const token = this.generateToken({
      userId: user._id,
      subscriptionId: subscription.subscription_id,
      roleIds: user.role_ids
    });

    const refreshToken = await this.userService.getRefreshToken(user._id);

    if (!refreshToken) {
      throw new Error('Refresh token not found');
    }

    return {
      user: {
        _id: user._id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
      },
      subscription: {
        subscription_id: subscription.subscription_id,
        plan: subscription.plan,
        features: subscription.features
      },
      token,
      refreshToken
    };
  }

async refreshToken(refreshToken: string) {
  const user = await this.userService.findByRefreshToken(refreshToken);
  const subscription = await this.subscriptionService.findByUserId(user._id);
  
  const newRefreshToken = Buffer.from(crypto.getRandomValues(new Uint8Array(40))).toString('hex');
  await this.userService.updateRefreshToken(user._id, newRefreshToken);
  
  const token = this.generateToken({
    userId: user._id,
    subscriptionId: subscription.subscription_id,
    roleIds: user.role_ids
  });
  
  return { token, refreshToken: newRefreshToken };
}}