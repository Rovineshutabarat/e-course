"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export type CourseFilters = {
  key?: string;
  categoryId?: number;
  difficulty?: string;
  minPrice?: number;
  maxPrice?: number;
};

function parseNumber(value: string | null): number | undefined {
  if (value === null || value.trim() === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function parseString(value: string | null): string | undefined {
  if (value === null || value.trim() === "") return undefined;
  return value;
}

export function useCourseFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters: CourseFilters = useMemo(
    () => ({
      key: parseString(searchParams.get("key")),
      categoryId: parseNumber(searchParams.get("categoryId")),
      difficulty: parseString(searchParams.get("difficulty")),
      minPrice: parseNumber(searchParams.get("minPrice")),
      maxPrice: parseNumber(searchParams.get("maxPrice")),
    }),
    [searchParams],
  );

  const setFilters = useCallback(
    (patch: Partial<CourseFilters>) => {
      const params = new URLSearchParams(searchParams.toString());
      (Object.entries(patch) as [keyof CourseFilters, unknown][]).forEach(
        ([key, value]) => {
          if (value === undefined || value === null || value === "") {
            params.delete(key);
          } else {
            params.set(key, String(value));
          }
        },
      );
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  const resetFilters = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  return { filters, setFilters, resetFilters };
}
