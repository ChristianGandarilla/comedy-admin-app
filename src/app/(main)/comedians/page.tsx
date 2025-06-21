import React from 'react';
import PageHeader from '@/components/page-header';
import { comedians } from '@/lib/data';
import ComedianCard from '@/components/comedians/comedian-card';

export default function ComediansPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Comedians"
        description="Manage your roster of talented comedians."
        buttonText="Add Comedian"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {comedians.map((comedian) => (
          <ComedianCard key={comedian.id} comedian={comedian} />
        ))}
      </div>
    </div>
  );
}
