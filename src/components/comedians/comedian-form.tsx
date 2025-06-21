
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
import { Instagram, Facebook, Youtube, Twitter, Music } from 'lucide-react';
import { Label } from '../ui/label';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  contact: z.object({
    email: z.string().email('Invalid email address.'),
    phone: z.string().min(10, 'Phone number seems too short.'),
  }),
  socialMedia: z.object({
    instagram: z.string().url({ message: "Invalid URL" }).optional().or(z.literal('')),
    facebook: z.string().url({ message: "Invalid URL" }).optional().or(z.literal('')),
    youtube: z.string().url({ message: "Invalid URL" }).optional().or(z.literal('')),
    x: z.string().url({ message: "Invalid URL" }).optional().or(z.literal('')),
  }),
  introSong: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  observations: z.string().optional(),
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
      socialMedia: {
        instagram: '',
        facebook: '',
        youtube: '',
        x: '',
      },
      introSong: '',
      observations: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (comedian) {
        form.reset({
          ...comedian,
          socialMedia: comedian.socialMedia || { instagram: '', facebook: '', youtube: '', x: '' }
        });
      } else {
        form.reset({
          name: '',
          contact: {
            email: '',
            phone: '',
          },
          socialMedia: {
            instagram: '',
            facebook: '',
            youtube: '',
            x: '',
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
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
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
                  name="socialMedia.facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center gap-3">
                            <Facebook className="h-5 w-5 text-muted-foreground" />
                            <Input placeholder="https://facebook.com/..." {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="socialMedia.youtube"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center gap-3">
                            <Youtube className="h-5 w-5 text-muted-foreground" />
                            <Input placeholder="https://youtube.com/..." {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="socialMedia.x"
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
              name="introSong"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Intro Song URL</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-3">
                        <Music className="h-5 w-5 text-muted-foreground" />
                        <Input placeholder="https://spotify.com/track/..." {...field} />
                    </div>
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
