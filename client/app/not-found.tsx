"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Compass } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <div
      className="relative flex flex-col items-center justify-center overflow-hidden px-4 py-16 text-center sm:py-20"
    >
      <div className="relative mb-2">
        <div
          aria-hidden="true"
          className="absolute inset-x-10 bottom-2 h-8 rounded-full bg-foreground/10 blur-xl"
        />
        <Image
          src="/not-found.png"
          alt=""
          aria-hidden="true"
          width={300}
          height={240}
          className="relative h-48 w-auto sm:h-80"
        />

        <div
          aria-hidden="true"
          className="absolute -left-24 top-6 hidden -rotate-6 items-center gap-2 rounded-2xl border bg-card px-3 py-2 text-xs font-medium shadow-sm md:flex motion-safe:animate-[float_7s_ease-in-out_infinite]"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-xl text-sm font-bold text-blue-600">
            404
          </span>
          NotFound missing
        </div>
        <div
          aria-hidden="true"
          className="absolute -right-24 top-24 hidden rotate-3 items-center gap-2 rounded-2xl border bg-card px-3 py-2 text-xs font-medium shadow-sm md:flex motion-safe:animate-[float_8s_ease-in-out_1s_infinite]"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-xl text-blue-600">
            <Compass className="h-4 w-4" />
          </span>
          Let's head back
        </div>
      </div>

      <h2 className="mb-2 max-w-md text-2xl font-bold tracking-tight text-balance sm:text-3xl">
        Page not found
      </h2>
      <p className="mb-8 max-w-md text-sm leading-6 text-muted-foreground text-balance">
        The page you're looking for doesn't exist or may have been
        removed. Let's get you back to learning.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          size="lg"
          variant="default"
          className="cursor-pointer"
          onClick={() => router.back()}
        >
          <ArrowLeft />
          <span>Go back</span>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
