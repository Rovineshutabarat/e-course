"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";

type WatchErrorProps = {
  onRetry: () => void;
};

const WatchError = ({ onRetry }: WatchErrorProps) => {
  return (
    <div className="flex min-h-[calc(100dvh-8rem)] flex-col items-center justify-center px-4 py-12">
      <div className="mx-auto max-w-md text-center">
        <div className="flex items-center justify-center">
          <AlertCircle className="text-red-700" size={40} />
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Something Went Wrong
        </h1>
        <p className="mt-4 text-muted-foreground text-sm">
          We couldn&apos;t load this course content. Please check your
          connection and try again.
        </p>
        <div className="mt-6 flex justify-center items-center">
          <Button className="cursor-pointer" onClick={onRetry}>
            <RotateCcw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WatchError;
