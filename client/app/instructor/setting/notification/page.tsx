"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

type NotifItem = {
  label: string;
  sub: string;
  email: boolean;
  push: boolean;
};

const NotificationSettingsPage = () => {
  const [courseNotifs, setCourseNotifs] = useState<NotifItem[]>([
    {
      label: "New Enrollment",
      sub: "When a student enrolls in one of your courses",
      email: true,
      push: true,
    },
    {
      label: "Course Review",
      sub: "When a student leaves a review on your course",
      email: true,
      push: false,
    },
    {
      label: "Course Completed",
      sub: "When a student completes your course",
      email: false,
      push: true,
    },
    {
      label: "New Question",
      sub: "When a student asks a question in your course",
      email: true,
      push: true,
    },
    {
      label: "Question Replied",
      sub: "When someone replies to a question you answered",
      email: false,
      push: false,
    },
  ]);

  const [earningNotifs, setEarningNotifs] = useState<NotifItem[]>([
    {
      label: "New Sale",
      sub: "When a student purchases your course",
      email: true,
      push: true,
    },
    {
      label: "Refund Requested",
      sub: "When a student requests a refund",
      email: true,
      push: true,
    },
    {
      label: "Payout Successful",
      sub: "When funds have been settled to your account",
      email: true,
      push: false,
    },
    {
      label: "Payout Failed",
      sub: "When a payout attempt is unsuccessful",
      email: true,
      push: true,
    },
    {
      label: "Payout Processing",
      sub: "When a payout is initiated and in progress",
      email: false,
      push: false,
    },
  ]);

  const [platformNotifs, setPlatformNotifs] = useState<NotifItem[]>([
    {
      label: "Platform Updates",
      sub: "New features, improvements, and announcements",
      email: true,
      push: false,
    },
    {
      label: "Policy Changes",
      sub: "Updates to terms of service or instructor policies",
      email: true,
      push: false,
    },
    {
      label: "Promotional Emails",
      sub: "Tips, resources, and offers from the platform",
      email: false,
      push: false,
    },
    {
      label: "Security Alerts",
      sub: "Login attempts and account security notifications",
      email: true,
      push: true,
    },
  ]);

  const toggle = (
    list: NotifItem[],
    setList: (v: NotifItem[]) => void,
    index: number,
    channel: "email" | "push",
  ) => {
    setList(
      list.map((item, i) =>
        i === index ? { ...item, [channel]: !item[channel] } : item,
      ),
    );
  };

  const renderSection = (
    title: string,
    description: string,
    items: NotifItem[],
    setItems: (v: NotifItem[]) => void,
  ) => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <div className="rounded-lg border overflow-hidden">
        <div className="grid grid-cols-[1fr_80px_80px] bg-muted/50 px-4 py-2 text-xs font-medium text-muted-foreground">
          <span>Notification</span>
          <span className="text-center">Email</span>
          <span className="text-center">Push</span>
        </div>
        {items.map((item, i) => (
          <div
            key={item.label}
            className={`grid grid-cols-[1fr_80px_80px] items-center px-4 py-3 ${i !== items.length - 1 ? "border-b" : ""}`}
          >
            <div>
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
            </div>
            <div className="flex justify-center">
              <Switch
                checked={item.email}
                onCheckedChange={() => toggle(items, setItems, i, "email")}
              />
            </div>
            <div className="flex justify-center">
              <Switch
                checked={item.push}
                onCheckedChange={() => toggle(items, setItems, i, "push")}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Notification Settings
        </h2>
        <p className="text-sm mt-1 text-muted-foreground">
          Control which notifications you receive and how they are delivered.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Manage email and push notifications for courses, earnings, and
            platform updates.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {renderSection(
            "Course Activity",
            "Notifications related to your courses and student interactions.",
            courseNotifs,
            setCourseNotifs,
          )}

          <Separator />

          {renderSection(
            "Earnings & Payouts",
            "Notifications related to sales, refunds, and payouts.",
            earningNotifs,
            setEarningNotifs,
          )}

          <Separator />

          {renderSection(
            "Platform",
            "Updates, announcements, and security alerts from the platform.",
            platformNotifs,
            setPlatformNotifs,
          )}

          <div className="flex justify-end">
            <Button>Save Notification Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettingsPage;
