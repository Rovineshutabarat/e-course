import { Difficulty } from "../enums/difficulty";
import { Visibility } from "../enums/visibility";
import { Category } from "./category";
import { Faq } from "./faq";
import { Outcome } from "./outcome";
import { Requirement } from "./requirement";
import { User } from "./user";

export interface Course {
    id: number;
    title: string;
    description: string;
    price: number;
    category: Category;
    instructor: User;
    difficulty: Difficulty;
    visibility: Visibility;
    language: string;
    requirements: Requirement[];
    outcomes: Outcome[];
    faqs: Faq[];
}