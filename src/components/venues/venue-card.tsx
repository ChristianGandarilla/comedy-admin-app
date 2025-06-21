
import React from 'react';
import Image from 'next/image';
import { MapPin, Calendar, MoreVertical, Star } from 'lucide-react';
import type { Venue } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '../ui/badge';

interface VenueCardProps {
  venue: Venue;
  onEdit: () => void;
  onDelete: () => void;
}

export default function VenueCard({ venue, onEdit, onDelete }: VenueCardProps) {
  return (
    <Card className="flex flex-col">
      <div className="relative">
        <Image
          src={venue.imageUrl}
          alt={venue.name}
          width={400}
          height={200}
          className="rounded-t-lg object-cover aspect-[2/1]"
          data-ai-hint="comedy club"
        />
        <div className="absolute top-2 right-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="h-8 w-8 bg-background/70 hover:bg-background/90">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
                    <DropdownMenuItem>View Shows</DropdownMenuItem>
                    <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive">
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="font-headline text-lg">{venue.name}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          {venue.address}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end gap-4">
        <div className="flex items-center gap-2">
            <Badge variant="outline">
                <Star className="h-3 w-3 mr-1 text-yellow-400 fill-yellow-400"/>
                Top Venue
            </Badge>
            <Badge variant="secondary">{venue.showHistory.length} Shows</Badge>
        </div>
        <Button variant="outline" className="w-full mt-2">
          <Calendar className="mr-2 h-4 w-4" />
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
