import React from 'react';
import PageHeader from '@/components/page-header';
import StatsCards from '@/components/dashboard/stats-cards';
import IncomeExpenseChart from '@/components/dashboard/income-expense-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TopPerformersChart from '@/components/dashboard/top-performers-chart';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Dashboard"
        description="Here's a snapshot of your comedy empire."
      />
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Income vs. Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <IncomeExpenseChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline">Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <TopPerformersChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
