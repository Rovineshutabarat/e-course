"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, BookX } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CourseNotFound = () => {
  const router = useRouter();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6">
      <div className="flex flex-col items-center justify-center py-20">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
          <BookX className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="mb-4 text-2xl font-semibold">Course not found</h2>
        <p className="mb-8 max-w-md text-center text-sm text-muted-foreground">
          The course you're looking for doesn't exist or may have
          been removed. Let's get you back to learning.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/course/list">
            <Button className="cursor-pointer">
              <span>Browse Courses</span>
              <ArrowRight />
            </Button>
          </Link>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => router.back()}
          >
            <ArrowLeft />
            <span>Go Back</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseNotFound;
