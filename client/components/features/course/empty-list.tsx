"use client";

import { Button } from "@/components/ui/button";
import { useCourseFilters } from "@/hooks/use-course-filters";
import {
  BookOpenCheck,
  RotateCcw,
  Sparkles
} from "lucide-react";
import Image from "next/image";

const EmptyList = () => {
  const { resetFilters } = useCourseFilters();

  return (
    <div
      className="relative flex flex-col items-center justify-center overflow-hidden px-4 py-16 text-center sm:py-24"
    >

      <div className="relative mb-2">
        <div
          aria-hidden="true"
          className="absolute inset-x-10 bottom-2 h-8 rounded-full bg-foreground/10 blur-xl"
        />
        <Image
          src="/error.png"
          alt=""
          aria-hidden="true"
          width={300}
          height={240}
          priority={false}
          className="relative h-40 w-auto sm:h-48"
        />

        <div
          aria-hidden="true"
          className="absolute -left-28 top-6 hidden -rotate-6 items-center gap-2 rounded-2xl border bg-card px-3 py-2 text-xs font-medium shadow-sm md:flex motion-safe:animate-[float_7s_ease-in-out_infinite]"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-xl text-blue-600">
            <BookOpenCheck className="h-4 w-4" />
          </span>
          0 matches
        </div>
        <div
          aria-hidden="true"
          className="absolute -right-28 top-10 hidden rotate-3 items-center gap-2 rounded-2xl border bg-card px-3 py-2 text-xs font-medium shadow-sm md:flex motion-safe:animate-[float_8s_ease-in-out_1s_infinite]"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-xl text-blue-600">
            <Sparkles className="h-4 w-4" />
          </span>
          Try another keyword
        </div>
      </div>
      <h2 className="mb-2 max-w-md text-2xl font-bold tracking-tight text-balance sm:text-3xl">
        No courses found
      </h2>
      <p className="mb-8 max-w-md text-sm leading-6 text-muted-foreground text-balance">
        We couldn't find any courses that match your search. Try a
        different keyword or clear the filters to browse everything.
      </p>

      <Button
        size="lg"
        className="cursor-pointer"
        onClick={() => resetFilters()}
      >
        <RotateCcw />
        <span>Refresh</span>
      </Button>
    </div>
  );
};

export default EmptyList;
