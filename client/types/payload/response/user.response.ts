import { Image } from "@/types/entity/image";

export type UserResponse = {
    username: string;
    email: string;
    verifiedAt: string;
    image: Image;
}