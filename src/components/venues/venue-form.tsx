
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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { Venue } from '@/lib/types';
import { Instagram, Twitter } from 'lucide-react';

const availableDaysOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  address: z.string().min(5, 'Address seems too short.'),
  contact: z.object({
    name: z.string().min(2, 'Contact name is required.'),
    email: z.string().email('Invalid email address.'),
    phone: z.string().min(10, 'Phone number seems too short.'),
  }),
  socialMedia: z.object({
    twitter: z.string().url({ message: "Invalid URL" }).optional().or(z.literal('')),
    instagram: z.string().url({ message: "Invalid URL" }).optional().or(z.literal('')),
  }),
  availableDays: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one day.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface VenueFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (data: FormValues) => void;
  venue?: Venue;
}

export default function VenueForm({
  isOpen,
  onOpenChange,
  onSubmit,
  venue,
}: VenueFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      contact: {
        name: '',
        email: '',
        phone: '',
      },
      socialMedia: {
        twitter: '',
        instagram: '',
      },
      availableDays: [],
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (venue) {
        form.reset({
          ...venue,
          socialMedia: venue.socialMedia || { twitter: '', instagram: '' },
        });
      } else {
        form.reset({
          name: '',
          address: '',
          contact: { name: '', email: '', phone: '' },
          socialMedia: { twitter: '', instagram: '' },
          availableDays: [],
        });
      }
    }
  }, [venue, isOpen, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{venue ? 'Edit Venue' : 'Add New Venue'}</DialogTitle>
          <DialogDescription>
            {venue ? 'Update the details for this venue.' : 'Add a new venue to your list.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Venue Name</FormLabel>
                  <FormControl>
                    <Input placeholder="The Laugh Factory" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Comedy Lane" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2 pt-2">
                <Label>Contact Person</Label>
                <div className="space-y-3 rounded-md border p-4">
                    <FormField control={form.control} name="contact.name" render={({ field }) => (
                        <FormItem><FormLabel className="text-xs">Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="contact.email" render={({ field }) => (
                        <FormItem><FormLabel className="text-xs">Email</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="contact.phone" render={({ field }) => (
                        <FormItem><FormLabel className="text-xs">Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
            </div>

            <div className="space-y-2 pt-2">
              <Label>Social Media</Label>
              <div className="space-y-3 rounded-md border p-4">
                <FormField
                  control={form.control}
                  name="socialMedia.instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center gap-3">
                            <Instagram className="h-5 w-5 text-muted-foreground" />
                            <Input placeholder="https://instagram.com/..." {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="socialMedia.twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center gap-3">
                            <Twitter className="h-5 w-5 text-muted-foreground" />
                            <Input placeholder="https://x.com/..." {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="availableDays"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Available Days</FormLabel>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {availableDaysOptions.map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="availableDays"
                        render={({ field }) => (
                          <FormItem
                            key={item}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item])
                                    : field.onChange(
                                        field.value?.filter((value) => value !== item)
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{item.substring(0,3)}</FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">{venue ? 'Save Changes' : 'Create Venue'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
