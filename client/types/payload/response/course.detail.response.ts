import { Faq } from "@/types/entity/faq";
import { Image } from "@/types/entity/image";
import { Outcome } from "@/types/entity/outcome";
import { Requirement } from "@/types/entity/requirement";
import { Difficulty } from "@/types/enums/difficulty";
import { Visibility } from "@/types/enums/visibility";
import { UserResponse } from "./user.response";

export type CourseDetailResponse = {
    id: number;
    title: string;
    slug: string;
    description: string;
    price: number;
    category: string;
    instructor: UserResponse;
    difficulty: Difficulty;
    visibility: Visibility;
    requirements: Requirement[];
    outcomes: Outcome[];
    faqs: Faq[];
    image: Image;
}