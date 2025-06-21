
'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/page-header';
import { comedians as initialComedians } from '@/lib/data';
import ComedianCard from '@/components/comedians/comedian-card';
import ComedianForm from '@/components/comedians/comedian-form';
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
import type { Comedian } from '@/lib/types';

// This is the type of data the form will produce
type ComedianFormData = Omit<Comedian, 'id' | 'performanceHistory' | 'imageUrl'>;

export default function ComediansPage() {
  const [comedians, setComedians] = useState<Comedian[]>(initialComedians);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingComedian, setEditingComedian] = useState<Comedian | undefined>(undefined);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [comedianToDelete, setComedianToDelete] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingComedian(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (comedian: Comedian) => {
    setEditingComedian(comedian);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setComedianToDelete(id);
    setIsAlertOpen(true);
  };

  const confirmDelete = () => {
    if (comedianToDelete) {
      setComedians(comedians.filter((c) => c.id !== comedianToDelete));
      setComedianToDelete(null);
    }
    setIsAlertOpen(false);
  };

  const handleFormSubmit = (data: ComedianFormData) => {
    if (editingComedian) {
      // Update existing comedian
      setComedians(
        comedians.map((c) =>
          c.id === editingComedian.id ? { ...c, ...data } : c
        )
      );
    } else {
      // Create new comedian
      const newComedian: Comedian = {
        ...data,
        id: `com-${Date.now()}`,
        imageUrl: 'https://placehold.co/100x100.png',
        performanceHistory: [],
      };
      setComedians([newComedian, ...comedians]);
    }
    setIsFormOpen(false);
    setEditingComedian(undefined);
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Comedians"
        description="Manage your roster of talented comedians."
        buttonText="Add Comedian"
        onButtonClick={handleAdd}
      />

      <ComedianForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        comedian={editingComedian}
      />

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              comedian and remove their data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {comedians.map((comedian) => (
          <ComedianCard
            key={comedian.id}
            comedian={comedian}
            onEdit={() => handleEdit(comedian)}
            onDelete={() => handleDelete(comedian.id)}
          />
        ))}
      </div>
    </div>
  );
}
