import React from 'react';
import PageHeader from '@/components/page-header';
import { transactions } from '@/lib/data';
import { columns } from '@/components/finances/columns';
import { DataTable } from '@/components/shows/data-table';
import FinancesStats from '@/components/finances/finances-stats';

export default function FinancesPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Finances"
        description="Track your income, expenses, and profitability."
        buttonText="Add Transaction"
      />
      <FinancesStats />
      <DataTable
        columns={columns}
        data={transactions}
        filterColumn="description"
        filterPlaceholder="Filter by description..."
      />
    </div>
  );
}
