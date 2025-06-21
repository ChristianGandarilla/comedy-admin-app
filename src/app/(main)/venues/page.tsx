import React from 'react';
import PageHeader from '@/components/page-header';
import { venues } from '@/lib/data';
import VenueCard from '@/components/venues/venue-card';

export default function VenuesPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Venues"
        description="Manage your performance venues and contacts."
        buttonText="Add Venue"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
}
