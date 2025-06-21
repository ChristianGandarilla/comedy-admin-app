
'use client';

import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { Transaction } from '@/lib/types';

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

interface IncomeExpenseChartProps {
  transactions: Transaction[];
}

export default function IncomeExpenseChart({ transactions }: IncomeExpenseChartProps) {
  const monthlyData = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleString('default', { month: 'long', year: 'numeric', timeZone: 'UTC' });
    if (!acc[month]) {
      acc[month] = { month, income: 0, expenses: 0, date: new Date(t.date) };
    }
    if (t.type === 'income') {
      acc[month].income += t.amount;
    } else {
      acc[month].expenses += t.amount;
    }
    return acc;
  }, {} as Record<string, { month: string, income: number, expenses: number, date: Date }>);

  const chartData = Object.values(monthlyData)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map(d => ({...d, month: d.month.split(' ')[0]})) // Keep only month name
    .slice(-6); // Last 6 months

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
