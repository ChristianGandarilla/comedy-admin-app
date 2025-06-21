'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Lightbulb, Loader2, BarChart, Sparkles } from 'lucide-react';

import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { suggestScheduleAction } from '@/app/actions/suggest-schedule';

const formSchema = z.object({
  showHistory: z.string().min(50, 'Please provide a more detailed show history for a better analysis.'),
});

type Suggestion = {
  suggestion: string;
  reasoning: string;
};

export default function ScheduleOptimizerPage() {
  const [isPending, startTransition] = useTransition();
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      showHistory: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSuggestion(null);
    startTransition(async () => {
      const result = await suggestScheduleAction(values);
      if (result.success && result.data) {
        setSuggestion(result.data);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error,
        });
      }
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="AI Schedule Optimizer"
        description="Use historical data to find the best time to schedule your next show."
      />
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <BarChart className="h-6 w-6" />
            Analyze Your Show History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="showHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paste Your Show History</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="E.g., 'Jan 15, 8 PM, The Laugh Factory, John Doe & Jane Smith, 150 attendees'..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Suggest Optimal Schedule
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {isPending && (
        <div className="flex justify-center items-center flex-col gap-4 text-muted-foreground p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p>Our AI is warming up the mic... Please wait.</p>
        </div>
      )}
      {suggestion && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-accent/20 border-accent">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-accent" />
                Suggestion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">{suggestion.suggestion}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Sparkles className="h-6 w-6" />
                Reasoning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{suggestion.reasoning}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
