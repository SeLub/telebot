export interface IAuthRegisterInput {
  email: string;
  password: string;
  name: string;
}

export interface IAuthLoginInput {
  email: string;
  password: string;
}

export interface IAuthResponse {
  user: {
    _id: string;
    email: string;
    first_name: string;
    last_name: string;
  };
  subscription: {
    subscription_id: string;
    plan: string;
    features: string[];
  };
  token: string;
  refreshToken: string;
}

export interface JWTPayload {
  userId: string;
  subscriptionId: string;
  roleIds: string[];
}