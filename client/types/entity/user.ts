import { Role } from "@/types/entity/role";
import { Image } from "./image";

export type User = {
  id: number;
  username: string;
  email: string;
  roles: Role[];
  image?: Image
};
