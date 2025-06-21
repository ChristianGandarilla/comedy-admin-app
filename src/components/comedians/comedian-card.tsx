
import React from 'react';
import Image from 'next/image';
import { Mail, Mic, Phone, Music, MoreVertical, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';
import type { Comedian } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ComedianCardProps {
  comedian: Comedian;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ComedianCard({ comedian, onEdit, onDelete }: ComedianCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div className="flex items-center gap-4">
            <Image
                src={comedian.imageUrl}
                alt={comedian.name}
                width={48}
                height={48}
                className="rounded-full"
                data-ai-hint="comedian portrait"
            />
            <div>
                <CardTitle className="font-headline text-lg">{comedian.name}</CardTitle>
                <CardDescription>
                <a href={`mailto:${comedian.contact.email}`} className="hover:underline">
                    {comedian.contact.email}
                </a>
                </CardDescription>
            </div>
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
                <DropdownMenuItem>View History</DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive">
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between gap-4">
        <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Phone className="h-4 w-4" />
                <span>{comedian.contact.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Music className="h-4 w-4" />
                {comedian.introSong ? (
                  <a href={comedian.introSong} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      Intro Song
                  </a>
                ) : (
                  <span>Intro: Not set</span>
                )}
            </div>
            <div className="flex items-center gap-4 text-muted-foreground mt-4">
                {comedian.socialMedia?.instagram && (
                    <a href={comedian.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                        <Instagram className="h-5 w-5" />
                    </a>
                )}
                {comedian.socialMedia?.facebook && (
                    <a href={comedian.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                        <Facebook className="h-5 w-5" />
                    </a>
                )}
                {comedian.socialMedia?.youtube && (
                    <a href={comedian.socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                        <Youtube className="h-5 w-5" />
                    </a>
                )}
                {comedian.socialMedia?.x && (
                    <a href={comedian.socialMedia.x} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                        <Twitter className="h-5 w-5" />
                    </a>
                )}
            </div>
        </div>
        <Button variant="outline" className="w-full mt-4">
            <Mic className="mr-2 h-4 w-4" />
            View Performances
        </Button>
      </CardContent>
    </Card>
  );
}
