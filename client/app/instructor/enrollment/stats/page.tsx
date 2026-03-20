"use client";

import { BookOpen, TrendingUp, UserCheck, Users } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const metricCards = [
  {
    label: "Total Enrollments",
    value: "2,350",
    change: "+180",
    sub: "vs last month",
    icon: Users,
  },
  {
    label: "New This Month",
    value: "180",
    change: "+12%",
    sub: "vs last month",
    icon: TrendingUp,
  },
  {
    label: "Active Learners",
    value: "1,847",
    change: "+9.4%",
    sub: "vs last month",
    icon: UserCheck,
  },
  {
    label: "Courses Enrolled In",
    value: "5",
    change: "+2",
    sub: "new courses",
    icon: BookOpen,
  },
];

const enrollmentOverTime = [
  { month: "Oct", enrollments: 120 },
  { month: "Nov", enrollments: 150 },
  { month: "Dec", enrollments: 100 },
  { month: "Jan", enrollments: 160 },
  { month: "Feb", enrollments: 170 },
  { month: "Mar", enrollments: 180 },
  { month: "Apr", enrollments: 210 },
  { month: "May", enrollments: 195 },
  { month: "Jun", enrollments: 230 },
  { month: "Jul", enrollments: 260 },
  { month: "Aug", enrollments: 245 },
  { month: "Sep", enrollments: 280 },
];

const enrollmentPerCourse = [
  { name: "React Fund.", enrollments: 842, newThisMonth: 48 },
  { name: "Next.js", enrollments: 631, newThisMonth: 36 },
  { name: "TypeScript", enrollments: 480, newThisMonth: 29 },
  { name: "JS Basics", enrollments: 397, newThisMonth: 41 },
  { name: "Node.js", enrollments: 310, newThisMonth: 26 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"];

const EnrollmentStatsPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Enrollment Stats</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Monitor enrollment activity and trends across all courses.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metricCards.map((card) => (
          <Card key={card.label}>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{card.label}</p>
                <card.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold mt-3">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-emerald-500 font-medium">
                  {card.change}
                </span>{" "}
                {card.sub}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Enrollments Over Time</CardTitle>
            <CardDescription>
              Monthly enrollment count for the past 12 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={enrollmentOverTime}
                  margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    fontSize={11}
                    tickMargin={8}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    fontSize={11}
                    tickMargin={8}
                  />
                  <Tooltip formatter={(value) => [value, "Enrollments"]} />
                  <Line
                    type="monotone"
                    dataKey="enrollments"
                    name="Enrollments"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#8884d8" }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Enrollments per Course</CardTitle>
            <CardDescription>
              Total vs new enrollments this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={enrollmentPerCourse}
                  margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    fontSize={10}
                    tickMargin={8}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    fontSize={10}
                    tickMargin={4}
                  />
                  <Tooltip />
                  <Bar
                    dataKey="enrollments"
                    name="Total"
                    fill="#8884d8"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="newThisMonth"
                    name="New This Month"
                    fill="#82ca9d"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Enrollment Share</CardTitle>
            <CardDescription>
              Percentage of total enrollments per course
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={enrollmentPerCourse.map((c) => ({
                    name: c.name,
                    pct: Math.round(
                      (c.enrollments /
                        enrollmentPerCourse.reduce(
                          (s, x) => s + x.enrollments,
                          0,
                        )) *
                        100,
                    ),
                  }))}
                  margin={{ top: 4, right: 32, left: 8, bottom: 4 }}
                >
                  <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    domain={[0, 50]}
                    tickLine={false}
                    axisLine={false}
                    fontSize={11}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    fontSize={11}
                    width={80}
                  />
                  <Tooltip formatter={(value) => [`${value}%`, "Share"]} />
                  <Bar
                    dataKey="pct"
                    name="Share"
                    radius={[0, 4, 4, 0]}
                    barSize={20}
                  >
                    {enrollmentPerCourse.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnrollmentStatsPage;
