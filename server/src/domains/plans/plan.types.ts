export interface IPlan {
  _id: string;
  code: "free" | "personal" | "teams";
  name: string;
  description: string;
  price: number;
  max_users: number | null;
  features: string[];
  allowed_roles: string[];
  is_active: boolean;
}
