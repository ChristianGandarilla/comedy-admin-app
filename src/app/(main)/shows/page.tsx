import React from 'react';
import PageHeader from '@/components/page-header';
import { shows } from '@/lib/data';
import { columns } from '@/components/shows/columns';
import { DataTable } from '@/components/shows/data-table';

export default function ShowsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Shows"
        description="Manage your upcoming and past shows."
        buttonText="Add New Show"
      />
      <DataTable
        columns={columns}
        data={shows}
        filterColumn="location"
        filterPlaceholder="Filter by location..."
      />
    </div>
  );
}
