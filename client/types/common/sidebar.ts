import { NavigationGroup } from "@/types/common/navigation.group";
import { LucideIcon } from "lucide-react";

export type Sidebar = {
  label: string;
  icon: LucideIcon;
  groups: NavigationGroup[];
};
