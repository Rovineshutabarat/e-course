"use client";

import {
  BookOpen,
  GraduationCap,
  Star,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  PolarGrid,
  RadialBar,
  RadialBarChart,
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
    label: "Total Students",
    value: "2,350",
    change: "+180",
    trend: "up",
    icon: Users,
    sub: "vs last month",
  },
  {
    label: "New Enrollments",
    value: "180",
    change: "+12%",
    trend: "up",
    icon: BookOpen,
    sub: "vs last month",
  },
  {
    label: "Avg. Course Rating",
    value: "4.8",
    change: "+0.2",
    trend: "up",
    icon: Star,
    sub: "vs last month",
  },
  {
    label: "Completion Rate",
    value: "73.5%",
    change: "+5.4%",
    trend: "up",
    icon: GraduationCap,
    sub: "vs last month",
  },
];

const trendData = [
  { month: "Oct", students: 1800, enrollments: 120, rating: 4.5 },
  { month: "Nov", students: 1950, enrollments: 150, rating: 4.6 },
  { month: "Dec", students: 2050, enrollments: 100, rating: 4.6 },
  { month: "Jan", students: 2150, enrollments: 160, rating: 4.7 },
  { month: "Feb", students: 2200, enrollments: 170, rating: 4.8 },
  { month: "Mar", students: 2350, enrollments: 180, rating: 4.8 },
];
const courseData = [
  {
    name: "React Fund.",
    category: "Development",
    enrollments: 842,
    completion: 78,
    rating: 4.9,
    reviews: 318,
    updatedAt: "Mar 12, 2025",
  },
  {
    name: "Next.js",
    category: "Development",
    enrollments: 631,
    completion: 65,
    rating: 4.8,
    reviews: 245,
    updatedAt: "Mar 10, 2025",
  },
  {
    name: "TypeScript",
    category: "Development",
    enrollments: 480,
    completion: 55,
    rating: 4.7,
    reviews: 187,
    updatedAt: "Feb 28, 2025",
  },
  {
    name: "JS Basics",
    category: "Development",
    enrollments: 397,
    completion: 90,
    rating: 4.6,
    reviews: 154,
    updatedAt: "Feb 20, 2025",
  },
  {
    name: "Node.js",
    category: "Backend",
    enrollments: 310,
    completion: 42,
    rating: 4.5,
    reviews: 98,
    updatedAt: "Mar 5, 2025",
  },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"];

const PerformancePage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Performance Summary
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Track your growth and course performance over time.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metricCards.map((card) => (
          <Card key={card.label}>
            <CardContent>
              <div className="flex items-center gap-x-2">
                <card.icon className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">{card.label}</p>
              </div>
              <div className="text-2xl font-bold mt-3">{card.value}</div>
              <p className="text-xs flex items-center gap-1 mt-1">
                {card.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span
                  className={
                    card.trend === "up" ? "text-emerald-500" : "text-red-500"
                  }
                >
                  {card.change}
                </span>
                <span className="text-muted-foreground">{card.sub}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Overall Trend</CardTitle>
            <CardDescription>
              Students, enrollments & avg. rating over 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={trendData}
                  margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="gradStudents"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="gradEnrollments"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradRating" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffc658" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
                    </linearGradient>
                  </defs>
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
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="students"
                    name="Total Students"
                    stroke="#8884d8"
                    strokeWidth={2}
                    fill="url(#gradStudents)"
                    dot={{ r: 2.5 }}
                    activeDot={{ r: 4 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="enrollments"
                    name="New Enrollments"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    fill="url(#gradEnrollments)"
                    dot={{ r: 2.5 }}
                    activeDot={{ r: 4 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="rating"
                    name="Avg. Rating"
                    stroke="#ffc658"
                    strokeWidth={2}
                    fill="url(#gradRating)"
                    dot={{ r: 2.5 }}
                    activeDot={{ r: 4 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Enrollment & Completion</CardTitle>
            <CardDescription>Per course comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={courseData}
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
                    name="Enrollments"
                    fill="#8884d8"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="completion"
                    name="Completion (%)"
                    fill="#82ca9d"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total Reviews per Course</CardTitle>
            <CardDescription>
              Number of reviews received — radial view
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <RadialBarChart
              width={320}
              height={220}
              data={courseData.map((c, i) => ({
                name: c.name,
                reviews: c.reviews,
                fill: COLORS[i],
              }))}
              innerRadius={28}
              outerRadius={100}
              barSize={14}
              startAngle={90}
              endAngle={-270}
            >
              <PolarGrid gridType="circle" radialLines={false} />
              <RadialBar
                dataKey="reviews"
                cornerRadius={6}
                label={{ position: "insideStart", fontSize: 10 }}
              >
                {courseData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </RadialBar>
              <Tooltip formatter={(value, name) => [value, name]} />
            </RadialBarChart>

            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5">
              {courseData.map((c, i) => (
                <span
                  key={c.name}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: COLORS[i] }}
                  />
                  {c.name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Avg. Rating per Course</CardTitle>
            <CardDescription>
              Student satisfaction score per course
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={courseData.map((c) => ({
                    name: c.name,
                    rating: c.rating,
                  }))}
                  layout="vertical"
                  margin={{ top: 4, right: 24, left: 8, bottom: 4 }}
                >
                  <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    domain={[4, 5]}
                    tickCount={6}
                    tickLine={false}
                    axisLine={false}
                    fontSize={11}
                    tickMargin={8}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    fontSize={11}
                    tickMargin={8}
                    width={80}
                  />
                  <Tooltip formatter={(value) => [value, "Avg. Rating"]} />
                  <Bar
                    dataKey="rating"
                    name="Avg. Rating"
                    radius={[0, 4, 4, 0]}
                    barSize={20}
                  >
                    {courseData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Performance Overview</CardTitle>
          <CardDescription>
            Complete metrics breakdown per course
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left font-medium text-muted-foreground px-4 py-3">
                  Course Name
                </th>
                <th className="text-left font-medium text-muted-foreground px-4 py-3">
                  Category
                </th>
                <th className="text-left font-medium text-muted-foreground px-4 py-3">
                  Total Enrollments
                </th>
                <th className="text-left font-medium text-muted-foreground px-4 py-3">
                  Completion Rate
                </th>
                <th className="text-left font-medium text-muted-foreground px-4 py-3">
                  Avg. Rating
                </th>
                <th className="text-left font-medium text-muted-foreground px-4 py-3">
                  Total Reviews
                </th>
                <th className="text-left font-medium text-muted-foreground px-4 py-3">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody>
              {courseData.map((course, i) => (
                <tr key={i} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 text-muted-foreground">
                    {course.name}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {course.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {course.enrollments.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-medium text-muted-foreground`}>
                      {course.completion}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                      {course.rating}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {course.reviews.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {course.updatedAt}
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

export default PerformancePage;
