
'use client';

import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { Show, Comedian } from '@/lib/types';

const chartConfig = {
  shows: {
    label: 'Shows',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

interface TopPerformersChartProps {
  shows: Show[];
  comedians: Comedian[];
}

export default function TopPerformersChart({ shows, comedians }: TopPerformersChartProps) {
  const performanceCounts = shows.reduce((acc, show) => {
    show.performers.forEach(performer => {
      if (acc[performer.id]) {
        acc[performer.id]++;
      } else {
        acc[performer.id] = 1;
      }
    });
    return acc;
  }, {} as Record<string, number>);

  const chartData = comedians
    .map(comedian => ({
      comedian: comedian.name,
      shows: performanceCounts[comedian.id] || 0,
    }))
    .filter(c => c.shows > 0)
    .sort((a, b) => b.shows - a.shows)
    .slice(0, 5);


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
        <Bar dataKey="shows" layout="vertical" radius={5} fill="var(--color-shows)" />
      </BarChart>
    </ChartContainer>
  );
}
