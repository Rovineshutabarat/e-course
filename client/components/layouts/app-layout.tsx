"use client";
import AuthProvider from "@/components/providers/auth-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Toaster } from "sonner";
import { TooltipProvider } from "../ui/tooltip";

type AppLayoutProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      retry: 2,
      retryDelay: 1000,
    },
  },
});

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <Toaster
        visibleToasts={4}
        expand={true}
        // theme={theme as "dark" | "light"}
        richColors={true}
      />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

export default AppLayout;
