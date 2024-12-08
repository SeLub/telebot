export interface ISubscription {
  subscription_id: string;
  user_id: string;
  plan: "free" | "premium";
  start_date: Date;
  end_date: Date;
}

export interface ISubscriptionCreate
  extends Omit<ISubscription, "subscription_id"> {}
export interface ISubscriptionUpdate extends Partial<ISubscriptionCreate> {}
