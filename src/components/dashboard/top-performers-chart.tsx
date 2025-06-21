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
  { comedian: 'John Doe', shows: 12, fill: 'var(--color-john)' },
  { comedian: 'Jane Smith', shows: 10, fill: 'var(--color-jane)' },
  { comedian: 'Mike Drop', shows: 8, fill: 'var(--color-mike)' },
  { comedian: 'Alice Giggle', shows: 7, fill: 'var(--color-alice)' },
  { comedian: 'Bob Chuckle', shows: 5, fill: 'var(--color-bob)' },
];

const chartConfig = {
  shows: {
    label: 'Shows',
  },
  john: {
    label: 'John Doe',
    color: 'hsl(var(--chart-1))',
  },
  jane: {
    label: 'Jane Smith',
    color: 'hsl(var(--chart-2))',
  },
  mike: {
    label: 'Mike Drop',
    color: 'hsl(var(--chart-3))',
  },
  alice: {
    label: 'Alice Giggle',
    color: 'hsl(var(--chart-4))',
  },
  bob: {
    label: 'Bob Chuckle',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export default function TopPerformersChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full h-72">
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
        margin={{
          left: -10,
        }}
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="comedian"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          className="capitalize"
        />
        <XAxis dataKey="shows" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar dataKey="shows" layout="vertical" radius={5} />
      </BarChart>
    </ChartContainer>
  );
}
