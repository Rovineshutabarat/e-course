import { Resource } from "./resource";

export type CourseModule = {
    id: number;
    title: string;
    orderNumber: number;
    resources: Resource[];
}
