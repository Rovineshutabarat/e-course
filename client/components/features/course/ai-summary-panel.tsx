"use client";

import { Button } from "@/components/ui/button";
import { FileText, Loader2 } from "lucide-react";

type AiSummaryPanelProps = {
  lessonTitle: string;
  summary?: string | null;
  isGenerating?: boolean;
  onGenerate?: () => void;
};

const AiSummaryPanel = ({
  lessonTitle,
  summary,
  isGenerating = false,
  onGenerate,
}: AiSummaryPanelProps) => {
  if (summary) {
    return (
      <div className="space-y-3 rounded-xl border bg-card p-6">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
            <FileText className="h-4 w-4" />
          </span>
          <h3 className="font-semibold">Lesson summary</h3>
        </div>
        <p className="text-[15px] leading-7 text-foreground/80">{summary}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-xl border bg-card p-8 text-center">
      <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
        <FileText className="h-6 w-6" />
      </span>
      <p className="font-semibold">Catch up in a minute</p>
      <p className="mx-auto max-w-md text-sm leading-6 text-muted-foreground">
        {onGenerate
          ? `Get the key points of "${lessonTitle}" without rewatching the whole video.`
          : "An AI summary of this lesson will show up here once enabled for this course."}
      </p>
      {onGenerate && (
        <Button
          onClick={onGenerate}
          disabled={isGenerating}
          className="rounded-full px-6"
        >
          {isGenerating && <Loader2 className="h-4 w-4 animate-spin" />}
          {isGenerating ? "Summarizing..." : "Generate summary"}
        </Button>
      )}
    </div>
  );
};

export default AiSummaryPanel;
