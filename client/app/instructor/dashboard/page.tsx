"use client";

import {
  BookOpen,
  ChevronRight,
  DollarSign,
  GraduationCap,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const summaryCards = [
  {
    label: "Active Courses",
    value: "12",
    change: "+2 this month",
    icon: BookOpen,
    href: "/instructor/courses",
  },
  {
    label: "Total Students",
    value: "2,350",
    change: "+180 this month",
    icon: Users,
    href: "/instructor/analytics/enrollment",
  },
  {
    label: "Avg. Rating",
    value: "4.8",
    change: "+0.2 this month",
    icon: Star,
    href: "/instructor/performance",
  },
  {
    label: "Revenue (This Month)",
    value: "$3,240",
    change: "+12% vs last month",
    icon: DollarSign,
    href: "/instructor/earnings",
  },
];

const recentActivity = [
  {
    icon: Users,
    title: "New student enrolled",
    description: "Sarah Johnson enrolled in React Fundamentals",
    time: "2h ago",
  },
  {
    icon: Star,
    title: "New review received",
    description: '5★ review on "Next.js Mastery"',
    time: "4h ago",
  },
  {
    icon: GraduationCap,
    title: "Course completion",
    description: "15 students completed JavaScript Basics",
    time: "1d ago",
  },
  {
    icon: DollarSign,
    title: "Payout processed",
    description: "$1,200 has been sent to your account",
    time: "2d ago",
  },
  {
    icon: BookOpen,
    title: "Course published",
    description: '"Advanced TypeScript" is now live',
    time: "3d ago",
  },
];

const topCourses = [
  {
    name: "React Fundamentals",
    category: "Web Dev",
    students: 842,
    enrollment: 1240,
    reviews: 318,
    revenue: "$1,240",
    rating: 4.9,
  },
  {
    name: "Next.js Mastery",
    category: "Web Dev",
    students: 631,
    enrollment: 890,
    reviews: 245,
    revenue: "$980",
    rating: 4.8,
  },
  {
    name: "TypeScript Pro",
    category: "Programming",
    students: 480,
    enrollment: 610,
    reviews: 187,
    revenue: "$720",
    rating: 4.7,
  },
  {
    name: "JavaScript Basics",
    category: "Programming",
    students: 397,
    enrollment: 540,
    reviews: 154,
    revenue: "$560",
    rating: 4.6,
  },
  {
    name: "Node.js Essentials",
    category: "Backend",
    students: 310,
    enrollment: 420,
    reviews: 98,
    revenue: "$430",
    rating: 4.5,
  },
];

const performanceHighlights = [
  { label: "Avg. Completion Rate", value: "73%", progress: 73 },
  { label: "Student Satisfaction", value: "4.8 / 5", progress: 96 },
  { label: "Monthly Revenue Goal", value: "$3,240 / $5,000", progress: 65 },
];

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <Link key={card.label} href={card.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent>
                <div className="flex items-center gap-x-2">
                  <card.icon className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium">{card.label}</p>
                </div>
                <div className="text-2xl font-bold mt-3">{card.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500">{card.change}</span>
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Activity + Quick Navigation */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest activities across your courses
              </CardDescription>
            </div>
            <Badge variant="secondary">{recentActivity.length} new</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {recentActivity.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2 mt-0.5 shrink-0">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-sm font-medium leading-none">
                      {item.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground shrink-0">
                    {item.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Navigation</CardTitle>
            <CardDescription>Jump to key sections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {[
                {
                  label: "All Courses",
                  href: "/instructor/courses",
                  icon: BookOpen,
                },
                {
                  label: "Enrollment Stats",
                  href: "/instructor/analytics/enrollment",
                  icon: Users,
                },
                {
                  label: "Earnings Overview",
                  href: "/instructor/earnings",
                  icon: DollarSign,
                },
                {
                  label: "Performance Summary",
                  href: "/instructor/performance",
                  icon: TrendingUp,
                },
                {
                  label: "Payout History",
                  href: "/instructor/earnings/payouts",
                  icon: DollarSign,
                },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Top Courses</CardTitle>
            <CardDescription>
              Overview of your published courses
            </CardDescription>
          </div>
          <Link
            href="/instructor/courses"
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            View all <ChevronRight className="h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent className="px-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left font-medium text-muted-foreground px-6 py-3">
                  Course Name
                </th>
                <th className="text-left font-medium text-muted-foreground px-4 py-3">
                  Category
                </th>
                <th className="text-left font-medium text-muted-foreground px-4 py-3">
                  Total Students
                </th>
                <th className="text-left font-medium text-muted-foreground px-4 py-3">
                  Total Enrollment
                </th>
                <th className="text-left font-medium text-muted-foreground px-4 py-3">
                  Total Reviews
                </th>
                <th className="text-left font-medium text-muted-foreground px-4 py-3">
                  Avg. Rating
                </th>
                <th className="text-right font-medium text-muted-foreground px-6 py-3">
                  Total Revenue
                </th>
              </tr>
            </thead>
            <tbody>
              {topCourses.map((course, i) => (
                <tr
                  key={i}
                  className="last:border-0 hover:bg-muted/50 transition-colors"
                >
                  <td className="px-6 py-3 text-muted-foreground">
                    {course.name}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {course.category}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {course.students.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {course.enrollment.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {course.reviews.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                      {course.rating}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right font-medium">
                    {course.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
