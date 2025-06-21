'use client';

import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { month: 'January', income: 1860, expenses: 800 },
  { month: 'February', income: 3050, expenses: 2000 },
  { month: 'March', income: 2370, expenses: 1200 },
  { month: 'April', income: 730, expenses: 1900 },
  { month: 'May', income: 2090, expenses: 1300 },
  { month: 'June', income: 2140, expenses: 1100 },
];

const chartConfig = {
  income: {
    label: 'Income',
    color: 'hsl(var(--chart-2))',
  },
  expenses: {
    label: 'Expenses',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export default function IncomeExpenseChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full h-72">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
         <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tickFormatter={(value) => `$${value / 1000}k`}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar dataKey="income" fill="var(--color-income)" radius={4} />
        <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
