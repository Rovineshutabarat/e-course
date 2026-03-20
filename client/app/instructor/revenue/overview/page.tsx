"use client";

import { ArrowDownToLine, DollarSign, TrendingUp, Wallet } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  PolarGrid,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const summary = {
  grossRevenue: 46_588,
  platformFee: 6_988,
  refunds: 2_340,
  netEarnings: 37_260,
  availableBalance: 3_210,
  pendingPayout: 1_240,
  totalWithdrawn: 32_810,
};

const balanceData = [
  { name: "Withdrawn", value: summary.totalWithdrawn },
  { name: "Available", value: summary.availableBalance },
];
const BALANCE_COLORS = ["#8884d8", "#82ca9d"];

const earningsOverTime = [
  { month: "Oct", gross: 3500, fee: 525, refunds: 200, net: 2775 },
  { month: "Nov", gross: 4000, fee: 600, refunds: 250, net: 3150 },
  { month: "Dec", gross: 3200, fee: 480, refunds: 180, net: 2540 },
  { month: "Jan", gross: 4300, fee: 645, refunds: 210, net: 3445 },
  { month: "Feb", gross: 4700, fee: 705, refunds: 230, net: 3765 },
  { month: "Mar", gross: 5100, fee: 765, refunds: 260, net: 4075 },
  { month: "Apr", gross: 4800, fee: 720, refunds: 240, net: 3840 },
  { month: "May", gross: 5500, fee: 825, refunds: 290, net: 4385 },
  { month: "Jun", gross: 5200, fee: 780, refunds: 270, net: 4150 },
  { month: "Jul", gross: 6100, fee: 915, refunds: 310, net: 4875 },
  { month: "Aug", gross: 5800, fee: 870, refunds: 295, net: 4635 },
  { month: "Sep", gross: 6388, fee: 958, refunds: 305, net: 5125 },
];

const earningsPerCourse = [
  {
    name: "React Fund.",
    gross: 15_600,
    fee: 2_340,
    refunds: 780,
    net: 12_480,
    withdrawn: 10_000,
    available: 2_480,
  },
  {
    name: "Next.js",
    gross: 11_550,
    fee: 1_733,
    refunds: 577,
    net: 9_240,
    withdrawn: 8_000,
    available: 1_240,
  },
  {
    name: "TypeScript",
    gross: 8_875,
    fee: 1_331,
    refunds: 444,
    net: 7_100,
    withdrawn: 7_100,
    available: 0,
  },
  {
    name: "JS Basics",
    gross: 6_000,
    fee: 900,
    refunds: 300,
    net: 4_800,
    withdrawn: 4_800,
    available: 0,
  },
  {
    name: "Node.js",
    gross: 4_563,
    fee: 684,
    refunds: 229,
    net: 3_650,
    withdrawn: 2_910,
    available: 740,
  },
];

const monthlyNetRadial = [
  { name: "React Fund.", net: 2900, fill: "#8884d8" },
  { name: "Next.js", net: 2080, fill: "#82ca9d" },
  { name: "TypeScript", net: 1620, fill: "#ffc658" },
  { name: "JS Basics", net: 1320, fill: "#ff8042" },
  { name: "Node.js", net: 812, fill: "#0088fe" },
];

// use global formatter instead
const fmt = (n: number) => `$${n.toLocaleString()}`;
const fmtK = (n: number) =>
  n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n}`;

const EarningsOverviewPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Earnings Overview</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Revenue, platform fee, refunds, and net earnings across all courses.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Gross Revenue",
            value: fmt(summary.grossRevenue),
            sub: "total from student purchases",
            icon: DollarSign,
            color: "",
          },
          {
            label: "Platform Fee (15%)",
            value: fmt(summary.platformFee),
            sub: "15% deducted from gross",
            icon: ArrowDownToLine,
            color: "text-orange-500",
          },
          {
            label: "Refunds",
            value: fmt(summary.refunds),
            sub: "returned to students",
            icon: ArrowDownToLine,
            color: "text-red-500",
          },
          {
            label: "Net Earnings",
            value: fmt(summary.netEarnings),
            sub: "gross − platform fee − refunds",
            icon: TrendingUp,
            color: "text-emerald-500",
          },
        ].map((card) => (
          <Card key={card.label}>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{card.label}</p>
                <card.icon
                  className={`h-4 w-4 ${card.color || "text-muted-foreground"}`}
                />
              </div>
              <div className={`text-2xl font-bold mt-3 ${card.color}`}>
                {card.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total Balance</CardTitle>
            <CardDescription>
              Withdrawn vs available (not yet withdrawn)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={balanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    dataKey="value"
                    paddingAngle={3}
                  >
                    {balanceData.map((_, i) => (
                      <Cell key={i} fill={BALANCE_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [fmt(value as number)]} />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: "12px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {balanceData.map((item, i) => (
                <div key={item.name} className="flex flex-col gap-0.5">
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ background: BALANCE_COLORS[i] }}
                    />
                    {item.name}
                  </span>
                  <span className="text-sm font-semibold">
                    {fmt(item.value)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-4 h-full justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">Available Balance</p>
              </div>
              <span className="text-xs text-muted-foreground">
                Ready to withdraw
              </span>
            </div>
            <div className="text-4xl font-bold text-emerald-500">
              {fmt(summary.availableBalance)}
            </div>
            <Button className="w-full" size="sm">
              <ArrowDownToLine className="h-4 w-4 mr-2" />
              Withdraw Funds
            </Button>
            <Separator />
            <div className="flex flex-col gap-2 text-xs">
              {[
                { label: "Pending payout", value: fmt(summary.pendingPayout) },
                { label: "Next payout date", value: "Apr 1, 2025" },
                {
                  label: "Total withdrawn",
                  value: fmt(summary.totalWithdrawn),
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between text-muted-foreground"
                >
                  <span>{row.label}</span>
                  <span className="font-medium text-foreground">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Earnings Over Time</CardTitle>
          <CardDescription>
            Gross revenue (purple), net earnings (green), platform fee (orange
            dashed), refunds (yellow dashed) — last 12 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={earningsOverTime}
                margin={{ top: 4, right: 8, left: 8, bottom: 0 }}
              >
                <defs>
                  {[
                    { id: "gradGross", color: "#8884d8" },
                    { id: "gradNet", color: "#82ca9d" },
                  ].map(({ id, color }) => (
                    <linearGradient
                      key={id}
                      id={id}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  ))}
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
                  tickFormatter={fmtK}
                />
                <Tooltip
                  formatter={(value, name) => [fmt(value as number), name]}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }}
                />
                <Area
                  type="monotone"
                  dataKey="gross"
                  name="Gross Revenue"
                  stroke="#8884d8"
                  strokeWidth={2}
                  fill="url(#gradGross)"
                  dot={false}
                  activeDot={{ r: 4 }}
                />
                <Area
                  type="monotone"
                  dataKey="net"
                  name="Net Earnings"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  fill="url(#gradNet)"
                  dot={false}
                  activeDot={{ r: 4 }}
                />
                <Area
                  type="monotone"
                  dataKey="fee"
                  name="Platform Fee"
                  stroke="#ff8042"
                  strokeWidth={1.5}
                  fill="none"
                  strokeDasharray="4 3"
                  dot={false}
                  activeDot={{ r: 4 }}
                />
                <Area
                  type="monotone"
                  dataKey="refunds"
                  name="Refunds"
                  stroke="#ffc658"
                  strokeWidth={1.5}
                  fill="none"
                  strokeDasharray="4 3"
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Earnings per Course</CardTitle>
            <CardDescription>
              Gross (purple), net (green), platform fee (orange), refunds
              (yellow) per course
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={earningsPerCourse}
                  margin={{ top: 4, right: 8, left: 8, bottom: 0 }}
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
                    tickFormatter={fmtK}
                  />
                  <Tooltip
                    formatter={(value, name) => [fmt(value as number), name]}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: "10px", paddingTop: "12px" }}
                  />
                  <Bar
                    dataKey="gross"
                    name="Gross Revenue"
                    fill="#8884d8"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="net"
                    name="Net Earnings"
                    fill="#82ca9d"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="fee"
                    name="Platform Fee"
                    fill="#ff8042"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="refunds"
                    name="Refunds"
                    fill="#ffc658"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Monthly Net Earnings per Course</CardTitle>
            <CardDescription>
              Net earnings only per course this month — each ring represents one
              course
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <RadialBarChart
              width={420}
              height={220}
              data={monthlyNetRadial}
              innerRadius={30}
              outerRadius={105}
              barSize={16}
              startAngle={90}
              endAngle={-270}
            >
              <PolarGrid gridType="circle" radialLines={false} />
              <RadialBar
                dataKey="net"
                background={{ fill: "hsl(var(--muted))" }}
                cornerRadius={6}
              >
                {monthlyNetRadial.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </RadialBar>
              <Tooltip
                formatter={(value) => [fmt(value as number), "Net Earnings"]}
              />
            </RadialBarChart>

            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5">
              {monthlyNetRadial.map((entry) => (
                <span
                  key={entry.name}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: entry.fill }}
                  />
                  {entry.name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Earnings Breakdown</CardTitle>
          <CardDescription>
            Gross, platform fee (15%), refunds, net earnings, withdrawn, and
            available balance per course
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left font-medium text-muted-foreground px-6 py-3">
                  Course Name
                </th>
                <th className="text-left font-medium text-muted-foreground px-4 py-3">
                  Gross
                </th>
                <th className="text-left font-medium text-muted-foreground px-4 py-3">
                  Platform Fee
                </th>
                <th className="text-left font-medium text-muted-foreground px-4 py-3">
                  Refunds
                </th>
                <th className="text-left font-medium text-muted-foreground px-4 py-3">
                  Net Earnings
                </th>
                <th className="text-left font-medium text-muted-foreground px-4 py-3">
                  Withdrawn
                </th>
                <th className="text-left font-medium text-muted-foreground px-4 py-3">
                  Available Balance
                </th>
              </tr>
            </thead>
            <tbody>
              {earningsPerCourse.map((course, i) => (
                <tr
                  key={i}
                  className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                >
                  <td className="px-6 py-3 text-muted-foreground">
                    {course.name}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {fmt(course.gross)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {fmt(course.fee)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {fmt(course.refunds)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {fmt(course.net)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {fmt(course.withdrawn)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {fmt(course.available)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t bg-muted/70">
                <td className="px-6 py-3 font-semibold">Total</td>
                <td className="px-4 py-3 font-bold">
                  {fmt(earningsPerCourse.reduce((s, c) => s + c.gross, 0))}
                </td>
                <td className="px-4 py-3 font-bold">
                  -{fmt(earningsPerCourse.reduce((s, c) => s + c.fee, 0))}
                </td>
                <td className="px-4 py-3 font-bold">
                  -{fmt(earningsPerCourse.reduce((s, c) => s + c.refunds, 0))}
                </td>
                <td className="px-4 py-3 font-bold">
                  {fmt(earningsPerCourse.reduce((s, c) => s + c.net, 0))}
                </td>
                <td className="px-4 py-3 font-bold">
                  {fmt(earningsPerCourse.reduce((s, c) => s + c.withdrawn, 0))}
                </td>
                <td className="px-4 py-3 font-bold">
                  {fmt(earningsPerCourse.reduce((s, c) => s + c.available, 0))}
                </td>
              </tr>
            </tfoot>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningsOverviewPage;
