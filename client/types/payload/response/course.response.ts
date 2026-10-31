import { Image } from "@/types/entity/image";
import { Difficulty } from "@/types/enums/difficulty";
import { Visibility } from "@/types/enums/visibility";
import { UserResponse } from "./user.response";

export type CourseResponse = {
    id: number;
    title: string;
    slug: string;
    description: string;
    price: number;
    category: string;
    instructor: UserResponse;
    difficulty: Difficulty
    visibility?: Visibility
    image: Image
}