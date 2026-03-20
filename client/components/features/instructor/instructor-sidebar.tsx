"use client";

import AppSidebar from "@/components/shared/app-sidebar";
import { Sidebar } from "@/types/sidebar";
import {
  Bell,
  BookCheck,
  CreditCard,
  DollarSign,
  GraduationCap,
  History,
  LayoutDashboard,
  LineChart,
  PenSquare,
  Settings,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Fragment } from "react";

const InstructorSidebar = () => {
  const sidebarContent: Sidebar = {
    label: "Instructor",
    icon: GraduationCap,
    groups: [
      {
        label: "Overview",
        items: [
          {
            label: "Dashboard",
            icon: LayoutDashboard,
            path: "/instructor/dashboard",
          },
          {
            label: "Performance Summary",
            icon: TrendingUp,
            path: "/instructor/performance",
          },
        ],
      },
      {
        label: "Courses",
        items: [
          {
            label: "All Courses",
            icon: BookCheck,
            path: "/instructor/courses",
          },
          {
            label: "Create Course",
            icon: PenSquare,
            path: "/instructor/course/create",
          },
        ],
      },
      {
        label: "Enrollment",
        items: [
          {
            label: "Enrollment Stats",
            icon: LineChart,
            path: "/instructor/enrollment/stats",
          },
          {
            label: "Enrollment History",
            icon: History,
            path: "/instructor/analytics/enrollment",
          },
        ],
      },
      {
        label: "Revenue",
        items: [
          {
            label: "Revenue Overview",
            icon: Wallet,
            path: "/instructor/revenue/overview",
          },
          {
            label: "Payout History",
            icon: DollarSign,
            path: "/instructor/revenue/payouts",
          },
        ],
      },
      {
        label: "Settings",
        items: [
          {
            label: "Payout Settings",
            icon: CreditCard,
            path: "/instructor/settings/profile",
          },
          {
            label: "Notification Settings",
            icon: Bell,
            path: "/instructor/settings/profile",
          },
          {
            label: "Profile Settings",
            icon: Settings,
            path: "/instructor/settings/profile",
          },
        ],
      },
    ],
  };

  return (
    <Fragment>
      <AppSidebar data={sidebarContent} />
    </Fragment>
  );
};

export default InstructorSidebar;
