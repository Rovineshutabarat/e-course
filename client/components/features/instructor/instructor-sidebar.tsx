"use client";

import AppSidebar from "@/components/shared/app-sidebar";
import { Sidebar } from "@/types/sidebar";
import { Home, SchoolIcon, User } from "lucide-react";
import { Fragment } from "react";

const InstructorSidebar = () => {
  const sidebarContent: Sidebar = {
    label: "Company Internal",
    icon: SchoolIcon,
    groups: [
      {
        label: "Main",
        items: [
          {
            label: "Department",
            icon: Home,
            subItems: [
              {
                label: "Department List",
                path: "/company/department/list",
              },
              {
                label: "Department Create",
                path: "/company/department/create",
              },
            ],
          },
          {
            label: "Course",
            icon: User,
            subItems: [
              {
                label: "Create Course",
                path: "/instructor/course/create",
              },
              {
                label: "Add Employee",
                path: "/company/employee/add",
              },
            ],
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
