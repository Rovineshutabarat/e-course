import { Course } from "./course";
import { Resource } from "./resource";

export type Module = {
    id: number;
    title: string;
    order_number: number;
    course: Course;
    resources: Resource[];
}
