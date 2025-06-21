
'use client';

import { ColumnDef, Row, Table } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
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

interface ActionsCellProps<TData, TValue> {
  row: Row<TData>;
  table: Table<TData>;
}

const ActionsCell = <TData extends Show, TValue>({ row, table }: ActionsCellProps<TData, TValue>) => {
  const show = row.original;
  const { handleEdit, handleDelete } = table.options.meta as any;

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
      return (
        <div className="flex -space-x-2 overflow-hidden">
          {performers.map((p) => (
            <Avatar key={p.id} className="h-8 w-8 border-2 border-background">
              <AvatarImage src={p.imageUrl} alt={p.name} />
              <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
            </Avatar>
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
        const date = new Date(row.getValue('date'));
        const status = date > new Date() ? 'Upcoming' : 'Past';
        return <Badge variant={status === 'Upcoming' ? 'default' : 'secondary'}>{status}</Badge>;
    }
  },
  {
    id: 'actions',
    cell: ActionsCell
  },
];
