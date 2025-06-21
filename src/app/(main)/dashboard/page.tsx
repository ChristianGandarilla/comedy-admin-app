
'use client';

import React from 'react';
import PageHeader from '@/components/page-header';
import StatsCards from '@/components/dashboard/stats-cards';
import IncomeExpenseChart from '@/components/dashboard/income-expense-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TopPerformersChart from '@/components/dashboard/top-performers-chart';
import UpcomingShows from '@/components/dashboard/upcoming-shows';
import useLocalStorage from '@/hooks/use-local-storage';
import {
  comedians as initialComedians,
  venues as initialVenues,
  shows as initialShows,
  transactions as initialTransactions,
} from '@/lib/data';
import type { Comedian, Venue, Show, Transaction } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const [comedians, setComedians] = useLocalStorage<Comedian[]>('comedians', initialComedians);
  const [venues, setVenues] = useLocalStorage<Venue[]>('venues', initialVenues);
  const [shows, setShows] = useLocalStorage<Show[]>('shows', initialShows);
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', initialTransactions);

  const dataLoaded =
    comedians !== undefined &&
    venues !== undefined &&
    shows !== undefined &&
    transactions !== undefined;

  if (!dataLoaded) {
    return (
      <div className="flex flex-col gap-8">
        <PageHeader
          title="Dashboard"
          description="Here's a snapshot of your comedy empire."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <Skeleton className="lg:col-span-3 h-80" />
          <Skeleton className="lg:col-span-2 h-80" />
        </div>
         <div className="grid grid-cols-1 gap-6">
          <Skeleton className="h-80" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Dashboard"
        description="Here's a snapshot of your comedy empire."
      />
      <StatsCards
        shows={shows}
        transactions={transactions}
        venues={venues}
        comedians={comedians}
      />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Income vs. Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <IncomeExpenseChart transactions={transactions} />
          </CardContent>
        </Card>
        <UpcomingShows shows={shows} />
      </div>
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <TopPerformersChart shows={shows} comedians={comedians} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
