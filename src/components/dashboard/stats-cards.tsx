
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Mic, Building, BarChart4 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import type { Show, Transaction, Venue, Comedian } from '@/lib/types';

interface StatsCardsProps {
  shows: Show[];
  transactions: Transaction[];
  venues: Venue[];
  comedians: Comedian[];
}

export default function StatsCards({
  shows,
  transactions,
  venues,
  comedians,
}: StatsCardsProps) {
  const totalShows = shows.length;
  const netProfit = transactions.reduce((acc, t) => {
    return t.type === 'income' ? acc + t.amount : acc - t.amount;
  }, 0);

  // Simplified logic for top venue and comedian
  const topVenue = venues[0]?.name || 'N/A'; 
  const topComedian = comedians[0]?.name || 'N/A';

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Shows</CardTitle>
          <BarChart4 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalShows}</div>
          <p className="text-xs text-muted-foreground">All-time shows scheduled</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(netProfit)}</div>
          <p className="text-xs text-muted-foreground">All-time net profit</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Venue</CardTitle>
          <Building className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold truncate">{topVenue}</div>
          <p className="text-xs text-muted-foreground">Highest attendance (TBD)</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Comedian</CardTitle>
          <Mic className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{topComedian}</div>
          <p className="text-xs text-muted-foreground">Most performances (TBD)</p>
        </CardContent>
      </Card>
    </div>
  );
}
