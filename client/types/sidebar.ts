import { NavigationGroup } from "@/types/navigation.group";
import { LucideIcon } from "lucide-react";

export type Sidebar = {
  label: string;
  icon: LucideIcon;
  groups: NavigationGroup[];
};
