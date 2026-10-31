"use client";

import WatchDiscussion from "@/components/features/course/watch-discussion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, MessagesSquare, Sparkles } from "lucide-react";
import { useState } from "react";

const WatchTabs = () => {
  const [activeTab, setActiveTab] = useState("discussions");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="w-full max-w-full justify-start overflow-x-auto bg-card">
        <TabsTrigger value="discussions" className="shrink-0 gap-1.5">
          <MessagesSquare className="h-3.5 w-3.5" />
          Discussion
        </TabsTrigger>
        <TabsTrigger value="quiz" className="shrink-0 gap-1.5">
          <Sparkles className="h-3.5 w-3.5" />
          AI Quiz
        </TabsTrigger>
        <TabsTrigger value="summary" className="shrink-0 gap-1.5">
          <FileText className="h-3.5 w-3.5" />
          AI Summary
        </TabsTrigger>
      </TabsList>

      <TabsContent value="discussions">
        <WatchDiscussion />
      </TabsContent>

      <TabsContent value="quiz" />

      <TabsContent value="summary" />
    </Tabs>
  );
};

export default WatchTabs;
