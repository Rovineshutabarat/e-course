import { Resource } from "./resource";

export type CourseModule = {
    id: number;
    title: string;
    order_number: number;
    resources: Resource[];
}
