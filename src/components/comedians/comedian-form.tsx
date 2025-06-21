
'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Comedian } from '@/lib/types';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  contact: z.object({
    email: z.string().email('Invalid email address.'),
    phone: z.string().min(10, 'Phone number seems too short.'),
  }),
  introSong: z.string().min(2, 'Intro song must be at least 2 characters.'),
  observations: z.string().default(''),
});

type FormValues = z.infer<typeof formSchema>;

interface ComedianFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (data: FormValues) => void;
  comedian?: Comedian;
}

export default function ComedianForm({
  isOpen,
  onOpenChange,
  onSubmit,
  comedian,
}: ComedianFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      contact: {
        email: '',
        phone: '',
      },
      introSong: '',
      observations: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (comedian) {
        form.reset(comedian);
      } else {
        form.reset({
          name: '',
          contact: {
            email: '',
            phone: '',
          },
          introSong: '',
          observations: '',
        });
      }
    }
  }, [comedian, isOpen, form]);
  
  const handleFormSubmit = (data: FormValues) => {
    onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{comedian ? 'Edit Comedian' : 'Add New Comedian'}</DialogTitle>
          <DialogDescription>
            {comedian ? 'Update the details for this comedian.' : 'Add a new comedian to your roster.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="123-456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="introSong"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Intro Song</FormLabel>
                  <FormControl>
                    <Input placeholder="Eye of the Tiger" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="observations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observations</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Great with crowd work..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">
                {comedian ? 'Save Changes' : 'Create Comedian'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
