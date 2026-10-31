"use client";
import { getAccessToken, setAccessToken } from "@/configurations/api.client";
import { refreshAccessToken } from "@/configurations/refresh.client";
import { Role } from "@/types/entity/role";
import { AuthResponse } from "@/types/payload/response/auth.response";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type AuthProviderContextState = {
  session: AuthResponse | null;
  setSession: (session: AuthResponse | null) => void;
  isAuthenticated: boolean;
  hasRoles: (roles: string[]) => boolean;
  isRefreshLoading: boolean;
};

export const AuthProviderContext = React.createContext<
  AuthProviderContextState | undefined
>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSessionState] = React.useState<AuthResponse | null>(null);
  const [isRefreshLoading, setIsRefreshLoading] = React.useState<boolean>(true);
  const pathname = usePathname();
  const router = useRouter();

  const setSession = React.useCallback((response: AuthResponse | null) => {
    setSessionState(response);
    setAccessToken(response?.access_token ?? null);
  }, []);

  React.useEffect(() => {
    if (pathname.startsWith("/auth")) {
      setIsRefreshLoading(false);
      return;
    }
    if (getAccessToken()) {
      setIsRefreshLoading(false);
      return;
    }
    (async () => {
      try {
        const response = await refreshAccessToken();
        setSession(response);
      } catch {
        setSession(null);
      } finally {
        setIsRefreshLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasRoles = React.useCallback(
    (roles: string[]): boolean => {
      if (!session?.user?.roles || roles.length === 0) {
        return false;
      }

      return session.user.roles.some((role: Role): boolean => {
        return roles.includes(role.name);
      });
    },
    [session],
  );

  const isAuthenticated = React.useMemo(
    () => Boolean(session?.access_token && session?.user),
    [session],
  );

  React.useEffect(() => {
    if (
      !isRefreshLoading &&
      isAuthenticated &&
      (pathname === "/auth/login" || pathname === "/auth/register")
    ) {
      router.replace("/");
    }
  }, [isAuthenticated, isRefreshLoading, pathname, router]);

  return (
    <AuthProviderContext.Provider
      value={{
        session,
        setSession,
        isAuthenticated: isAuthenticated,
        hasRoles,
        isRefreshLoading,
      }}
    >
      {children}
    </AuthProviderContext.Provider>
  );
}
