"use client";

import { Button } from "@/components/ui/button";
import { getAccessToken } from "@/configurations/api.client";
import { refreshAccessToken } from "@/configurations/refresh.client";
import { resolvePath } from "@/lib/path-resolver";
import type { Resource } from "@/types/entity/resource";
import MuxPlayer from "@mux/mux-player-react";
import { AlertCircle, PlayCircle, RotateCcw } from "lucide-react";
import { useState } from "react";

type WatchPlayerProps = {
  resource?: Resource;
  totalResources: number;
  isError?: boolean;
  onRetry?: () => void;
};

const WatchPlayer = ({
  resource,
  totalResources,
  isError = false,
  onRetry,
}: WatchPlayerProps) => {
  const [playerKey, setPlayerKey] = useState(0);
  const isProcessing = resource?.is_available === false;

  const streamSrc = resolvePath(resource?.url);
  const token = getAccessToken();

  const handleRetry = async () => {
    await refreshAccessToken().catch(() => undefined);
    setPlayerKey((key) => key + 1);
    onRetry?.();
  };

  return (
    <div className="overflow-hidden rounded-xl border bg-black">
      {resource ? (
        <MuxPlayer
          key={`${resource.id}-${playerKey}`}
          streamType="on-demand"
          src={streamSrc}
          autoPlay={true}
          title={resource.title}
          style={{ aspectRatio: "16 / 9", width: "100%" }}
          _hlsConfig={{
            xhrSetup: (xhr: XMLHttpRequest) => {
              xhr.setRequestHeader("Authorization", `Bearer ${token}`);
            },
          }}
        />
      ) : isError ? (
        <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 p-6 text-center">
          <AlertCircle className="h-10 w-10 text-white/70" />
          <p className="font-semibold text-white">
            Failed to load this lesson
          </p>
          <p className="max-w-md text-sm text-white/70">
            The video couldn't be fetched. Check your connection and try
            again.
          </p>
          {onRetry && (
            <Button
              variant="secondary"
              onClick={handleRetry}
              className="rounded-full px-6"
            >
              <RotateCcw className="h-4 w-4" />
              Retry
            </Button>
          )}
        </div>
      ) : (
        <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 p-6 text-center">
          <PlayCircle className="h-10 w-10 text-white/80" />
          <p className="font-semibold text-white">
            Video isn't available yet
          </p>
          <p className="max-w-md text-sm text-white/70">
            {isProcessing
              ? "This lesson is still being processed. Check back soon."
              : totalResources === 0
                ? "Lessons will appear here once the instructor publishes them."
                : "This lesson has no playable video attached."}
          </p>
        </div>
      )}
    </div>
  );
};

export default WatchPlayer;
