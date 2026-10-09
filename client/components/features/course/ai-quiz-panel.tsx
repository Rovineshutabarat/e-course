"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";

type AiQuizPanelProps = {
  lessonTitle: string;
  isGenerating?: boolean;
  onGenerate?: () => void;
};

const AiQuizPanel = ({
  lessonTitle,
  isGenerating = false,
  onGenerate,
}: AiQuizPanelProps) => {
  return (
    <div className="space-y-3 rounded-xl border bg-card p-8 text-center">
      <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Sparkles className="h-6 w-6" />
      </span>
      <p className="font-semibold">Check what stuck</p>
      <p className="mx-auto max-w-md text-sm leading-6 text-muted-foreground">
        {onGenerate
          ? `Answer a short quiz generated from "${lessonTitle}" and see what to review.`
          : "AI quizzes for this lesson will show up here once enabled for this course."}
      </p>
      {onGenerate && (
        <Button
          onClick={onGenerate}
          disabled={isGenerating}
          className="rounded-full px-6"
        >
          {isGenerating && <Loader2 className="h-4 w-4 animate-spin" />}
          {isGenerating ? "Generating quiz..." : "Generate quiz"}
        </Button>
      )}
    </div>
  );
};

export default AiQuizPanel;
