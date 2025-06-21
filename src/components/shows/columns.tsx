
'use client';

import * as React from 'react';
import { ColumnDef, Row, Table } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Star, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Show } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const StatusCell = ({ dateString }: { dateString: string }) => {
  const [status, setStatus] = React.useState<string | null>(null);

  React.useEffect(() => {
    // This code runs only on the client, after hydration
    const showDateAtMidnight = new Date(dateString);
    showDateAtMidnight.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (showDateAtMidnight.getTime() === today.getTime()) {
      setStatus('Active');
    } else if (showDateAtMidnight > today) {
      setStatus('Upcoming');
    } else {
      setStatus('Past');
    }
  }, [dateString]);

  if (status === null) {
    // Render a placeholder on the server and on initial client render to prevent mismatch
    return <Skeleton className="h-6 w-20 rounded-full" />;
  }
  
  if (status === 'Active') {
    return <Badge variant={'outline'} className="text-green-600 border-green-600">{status}</Badge>;
  }

  return <Badge variant={status === 'Upcoming' ? 'default' : 'secondary'}>{status}</Badge>;
};

interface ActionsCellProps<TData, TValue> {
  row: Row<TData>;
  table: Table<TData>;
}

const dataUrlToFile = async (dataUrl: string, filename: string): Promise<File | null> => {
    try {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      return new File([blob], filename, { type: blob.type });
    } catch (error) {
      console.error('Error converting data URL to file:', error);
      return null;
    }
}

const ActionsCell = <TData extends Show, TValue>({ row, table }: ActionsCellProps<TData, TValue>) => {
  const show = row.original;
  const { handleEdit, handleDelete } = table.options.meta as any;
  const { toast } = useToast();

  const handleShare = async () => {
    const shareData: ShareData = {
        title: `Comedy Show: ${show.location}`,
        text: `Don't miss this comedy show on ${formatDate(show.date)} at ${show.location}, featuring ${show.lineup.join(', ')}!`,
    };

    if (navigator.share) {
        if (show.flyerUrl) {
            const file = await dataUrlToFile(show.flyerUrl, `show-flyer.png`);
            if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
                shareData.files = [file];
            }
        }
        try {
            await navigator.share(shareData);
        } catch (error) {
            // Don't show an error toast if the user cancels the share dialog
            if (error instanceof DOMException && error.name === 'AbortError') {
                console.log('Share was cancelled by the user.');
                return;
            }
            
            console.error('Sharing failed:', error);
            toast({
                variant: 'destructive',
                title: 'Sharing Failed',
                description: 'Could not share the show. This can happen if permissions are denied or your browser does not support it in this context.',
            });
        }
    } else {
        toast({
            variant: 'destructive',
            title: 'Not Supported',
            description: 'Web sharing is not supported on your browser.',
        });
    }
  };

  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => handleEdit(show)}>Edit Show</DropdownMenuItem>
          <DropdownMenuItem>View Income/Expenses</DropdownMenuItem>
          <DropdownMenuItem onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share Show
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleDelete(show.id)} className="text-destructive focus:text-destructive">
            Delete Show
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};


export const columns: ColumnDef<Show>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => formatDate(row.getValue('date')),
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'performers',
    header: 'Performers',
    cell: ({ row }) => {
      const performers = row.getValue('performers') as Show['performers'];
      const { hostId } = row.original;
      return (
        <div className="flex -space-x-2 overflow-hidden">
          {performers.map((p) => (
             <div key={p.id} className="relative">
                <Avatar key={p.id} className="h-8 w-8 border-2 border-background">
                    <AvatarImage src={p.imageUrl} alt={p.name} />
                    <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {p.id === hostId && (
                    <div className="absolute -top-1 -right-1" title={`${p.name} (Host)`}>
                        <Badge variant="secondary" className="h-5 w-5 p-0 flex items-center justify-center rounded-full border-2 border-background bg-amber-400 hover:bg-amber-400">
                            <Star className="h-3 w-3 text-white" />
                        </Badge>
                    </div>
                )}
             </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: 'attendance',
    header: () => <div className="text-right">Attendance</div>,
    cell: ({ row }) => {
      const attendance = parseInt(row.getValue('attendance'), 10);
      return <div className="text-right font-medium">{attendance || 'N/A'}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
        const date = row.getValue('date') as string;
        return <StatusCell dateString={date} />;
    }
  },
  {
    id: 'actions',
    cell: ActionsCell
  },
];
