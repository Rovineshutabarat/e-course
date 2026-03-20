import type React from "react";

import InstructorNavbar from "@/components/features/instructor/instructor-navbar";
import InstructorSidebar from "@/components/features/instructor/instructor-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

interface InstructorLayoutProps {
  children: React.ReactNode;
}

export default function InstructorLayout({ children }: InstructorLayoutProps) {
  return (
    <SidebarProvider>
      <InstructorSidebar />
      <SidebarInset>
        <InstructorNavbar />
        <div className="py-5 px-10">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
