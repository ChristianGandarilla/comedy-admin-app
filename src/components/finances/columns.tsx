
'use client';

import { ColumnDef, Row, Table } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Transaction } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';

interface ActionsCellProps<TData, TValue> {
  row: Row<TData>;
  table: Table<TData>;
}

const ActionsCell = <TData extends Transaction, TValue>({ row, table }: ActionsCellProps<TData, TValue>) => {
  const transaction = row.original;
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
          <DropdownMenuItem onClick={() => handleEdit(transaction)}>
            Edit transaction
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleDelete(transaction.id)} className="text-destructive">
            Delete transaction
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const columns: ColumnDef<Transaction>[] = [
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
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.getValue('type') as string;
      const isIncome = type === 'income';
      return (
        <Badge variant={isIncome ? 'secondary' : 'outline'} className="capitalize">
          {isIncome ? <ArrowUpCircle className="mr-1 h-3 w-3 text-green-500"/> : <ArrowDownCircle className="mr-1 h-3 w-3 text-red-500"/>}
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => <div className="capitalize">{row.getValue('category')}</div>,
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const isIncome = row.getValue('type') === 'income';
      return (
        <div className={`text-right font-medium ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
          {formatCurrency(amount)}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ActionsCell,
  },
];
