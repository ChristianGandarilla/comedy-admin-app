
'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/page-header';
import { shows as initialShows, comedians, venues } from '@/lib/data';
import { columns } from '@/components/shows/columns';
import { DataTable } from '@/components/shows/data-table';
import ShowForm from '@/components/shows/show-form';
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
import type { Show } from '@/lib/types';

type ShowFormData = Omit<Show, 'id' | 'performers'> & { performerIds: string[] };

export default function ShowsPage() {
  const [shows, setShows] = useState<Show[]>(initialShows);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingShow, setEditingShow] = useState<Show | undefined>(undefined);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [showToDelete, setShowToDelete] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingShow(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (show: Show) => {
    setEditingShow(show);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setShowToDelete(id);
    setIsAlertOpen(true);
  };

  const confirmDelete = () => {
    if (showToDelete) {
      setShows(shows.filter((s) => s.id !== showToDelete));
      setShowToDelete(null);
    }
    setIsAlertOpen(false);
  };

  const handleFormSubmit = (data: ShowFormData) => {
    const showPerformers = data.performerIds.map(id => comedians.find(c => c.id === id)).filter(Boolean) as Show['performers'];
    
    if (editingShow) {
      setShows(
        shows.map((s) =>
          s.id === editingShow.id ? { ...s, ...data, performers: showPerformers } : s
        )
      );
    } else {
      const newShow: Show = {
        id: `show-${Date.now()}`,
        date: data.date,
        location: data.location,
        lineup: showPerformers.map(p => p.name),
        performers: showPerformers,
        notes: data.notes,
        income_expenses_id: `fin-${Date.now()}`,
        attendance: data.attendance,
        hostId: data.hostId,
      };
      setShows([newShow, ...shows]);
    }
    setIsFormOpen(false);
    setEditingShow(undefined);
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Shows"
        description="Manage your upcoming and past shows."
        buttonText="Add New Show"
        onButtonClick={handleAdd}
      />
      <ShowForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        show={editingShow}
        comedians={comedians}
        venues={venues}
      />
      
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this show and its associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DataTable
        columns={columns}
        data={shows}
        filterColumn="location"
        filterPlaceholder="Filter by location..."
        meta={{
          handleEdit,
          handleDelete,
        }}
      />
    </div>
  );
}
