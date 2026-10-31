"use client";
import AuthProvider from "@/components/providers/auth-provider";
import ThemeProvider from "@/components/providers/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

type AppLayoutProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      retry: (failureCount, error: any) => {
        if (error?.response?.status === 401) return false;
        return failureCount < 1;
      },
      retryDelay: 1000,
    },
    mutations: {
      retry: 0,
    },
  },
});

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <ThemeProvider>
      <Toaster visibleToasts={4} expand={true} richColors={true} />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default AppLayout;
