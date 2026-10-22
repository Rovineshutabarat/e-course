import { User } from "@/types/entity/user";

export type AuthResponse = {
  access_token: string;
  user: User;
};
