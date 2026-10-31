import { Image } from "@/types/entity/image";

export type UserResponse = {
    username: string;
    email: string;
    verified_at: string;
    image: Image;
}