import { Resource } from "@/types/entity/resource";

export type ModuleResponse = {
    id: number;
    title: string;
    order_number: number;
    resources: Resource[];
    total_resources: number
}