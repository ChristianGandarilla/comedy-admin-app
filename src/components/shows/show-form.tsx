
'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import type { Show, Comedian, Venue } from '@/lib/types';

const formSchema = z.object({
  date: z.date({ required_error: 'A date is required.' }),
  location: z.string().min(1, 'Location is required.'),
  performerIds: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one performer.',
  }),
  attendance: z.coerce.number().min(0, 'Attendance cannot be negative.'),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;
type ShowFormData = Omit<Show, 'id' | 'performers'> & { performerIds: string[] };

interface ShowFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (data: ShowFormData) => void;
  show?: Show;
  comedians: Comedian[];
  venues: Venue[];
}

export default function ShowForm({
  isOpen,
  onOpenChange,
  onSubmit,
  show,
  comedians,
  venues,
}: ShowFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      performerIds: [],
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (show) {
        form.reset({
          date: new Date(show.date),
          location: show.location,
          performerIds: show.performers.map(p => p.id),
          attendance: show.attendance,
          notes: show.notes,
        });
      } else {
        form.reset({
          date: new Date(),
          location: '',
          performerIds: [],
          attendance: 0,
          notes: '',
        });
      }
    }
  }, [show, isOpen, form]);

  const handleFormSubmit = (data: FormValues) => {
    onSubmit({
      ...data,
      date: data.date.toISOString(),
      lineup: [],
      income_expenses_id: show?.income_expenses_id || '',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{show ? 'Edit Show' : 'Add New Show'}</DialogTitle>
          <DialogDescription>
            {show ? 'Update the details for this show.' : 'Add a new show to your schedule.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Venue</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a venue" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {venues.map((venue) => (
                          <SelectItem key={venue.id} value={venue.name}>{venue.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="performerIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Performers</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-full justify-between',
                            !field.value?.length && 'text-muted-foreground'
                          )}
                        >
                          {field.value?.length ? `${field.value.length} selected` : 'Select performers'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <div className="p-2 space-y-1 max-h-60 overflow-auto">
                        {comedians.map((comedian) => (
                          <FormField
                            key={comedian.id}
                            control={form.control}
                            name="performerIds"
                            render={({ field }) => (
                              <FormItem
                                key={comedian.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(comedian.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...(field.value || []), comedian.id])
                                        : field.onChange(field.value?.filter((id) => id !== comedian.id));
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal w-full">{comedian.name}</FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="attendance"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Attendance</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="e.g. 150" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any notes for the show..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">{show ? 'Save Changes' : 'Create Show'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
