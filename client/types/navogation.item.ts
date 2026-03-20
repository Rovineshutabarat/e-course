import { LucideIcon } from "lucide-react";
import { NavigationSubItem } from "./navigation.sub.item";

export type NavigationItem = {
  label: string;
  icon: LucideIcon;
  path?: string;
  subItems?: NavigationSubItem[];
};
