
'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/page-header';
import { venues as initialVenues } from '@/lib/data';
import VenueCard from '@/components/venues/venue-card';
import VenueForm from '@/components/venues/venue-form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { Venue } from '@/lib/types';

type VenueFormData = Omit<Venue, 'id' | 'showHistory'>;

export default function VenuesPage() {
  const [venues, setVenues] = useState<Venue[]>(initialVenues);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVenue, setEditingVenue] = useState<Venue | undefined>(undefined);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [venueToDelete, setVenueToDelete] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingVenue(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (venue: Venue) => {
    setEditingVenue(venue);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setVenueToDelete(id);
    setIsAlertOpen(true);
  };

  const confirmDelete = () => {
    if (venueToDelete) {
      setVenues(venues.filter((v) => v.id !== venueToDelete));
      setVenueToDelete(null);
    }
    setIsAlertOpen(false);
  };

  const handleFormSubmit = (data: VenueFormData) => {
    if (editingVenue) {
      setVenues(
        venues.map((v) =>
          v.id === editingVenue.id ? { ...v, ...data, imageUrl: data.imageUrl || v.imageUrl } : v
        )
      );
    } else {
      const newVenue: Venue = {
        ...data,
        id: `ven-${Date.now()}`,
        imageUrl: data.imageUrl || 'https://placehold.co/400x200.png',
        showHistory: [],
      };
      setVenues([newVenue, ...venues]);
    }
    setIsFormOpen(false);
    setEditingVenue(undefined);
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Venues"
        description="Manage your performance venues and contacts."
        buttonText="Add Venue"
        onButtonClick={handleAdd}
      />

      <VenueForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        venue={editingVenue}
      />

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              venue and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {venues.map((venue) => (
          <VenueCard 
            key={venue.id} 
            venue={venue} 
            onEdit={() => handleEdit(venue)}
            onDelete={() => handleDelete(venue.id)}
          />
        ))}
      </div>
    </div>
  );
}
