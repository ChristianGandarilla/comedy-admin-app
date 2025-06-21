'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { shows } from '@/lib/data';
import type { Show } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { Calendar, Ticket } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

export default function UpcomingShows() {
  const [upcomingShows, setUpcomingShows] = useState<Show[]>([]);

  useEffect(() => {
    // This effect runs only on the client, after hydration, to avoid mismatches.
    const now = new Date();
    const filteredShows = shows
      .filter((show) => new Date(show.date) > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setUpcomingShows(filteredShows);
  }, []);

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="font-headline">Upcoming Shows</CardTitle>
      </CardHeader>
      <CardContent>
        {upcomingShows.length > 0 ? (
          <ScrollArea className="h-80 pr-4">
            <div className="space-y-6">
              {upcomingShows.map((show) => (
                <div key={show.id} className="flex gap-4 items-start group">
                  <div className="relative w-24 h-36 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                    {show.flyerUrl ? (
                      <Image
                        src={show.flyerUrl}
                        alt={`Flyer for ${show.location}`}
                        fill
                        className="object-cover"
                        data-ai-hint="event flyer"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground text-center p-2">
                        No Flyer
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5 flex-grow">
                    <p className="font-semibold leading-tight">{show.location}</p>
                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(show.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Ticket className="h-4 w-4" />
                        <span className="truncate">{show.lineup.join(', ')}</span>
                    </div>
                     <div className="mt-2">
                        <Button asChild variant="secondary" size="sm">
                            <Link href="/shows">View Details</Link>
                        </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center h-80 text-muted-foreground text-center">
            <Calendar className="h-12 w-12 mb-4" />
            <p className="font-semibold">No upcoming shows scheduled</p>
            <p className="text-sm">Check back later or create a new one!</p>
            <Button asChild size="sm" className="mt-4">
              <Link href="/shows">Add New Show</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
