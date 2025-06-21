'use server';

/**
 * @fileOverview This file contains the Genkit flow for suggesting optimal scheduling times based on past show data.
 *
 * - suggestOptimalSchedule - A function that analyzes past show data and suggests optimal scheduling times.
 * - SuggestOptimalScheduleInput - The input type for the suggestOptimalSchedule function.
 * - SuggestOptimalScheduleOutput - The return type for the suggestOptimalSchedule function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestOptimalScheduleInputSchema = z.object({
  showHistory: z
    .string()
    .describe(
      'A string containing the show history data, including date, time, location, performers, and attendance.'
    ),
});
export type SuggestOptimalScheduleInput = z.infer<typeof SuggestOptimalScheduleInputSchema>;

const SuggestOptimalScheduleOutputSchema = z.object({
  suggestion: z
    .string()
    .describe(
      'A suggestion for the optimal scheduling time, considering factors like attendance and profitability.'
    ),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the scheduling suggestion, explaining the factors considered.'
    ),
});
export type SuggestOptimalScheduleOutput = z.infer<typeof SuggestOptimalScheduleOutputSchema>;

export async function suggestOptimalSchedule(
  input: SuggestOptimalScheduleInput
): Promise<SuggestOptimalScheduleOutput> {
  return suggestOptimalScheduleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestOptimalSchedulePrompt',
  input: {schema: SuggestOptimalScheduleInputSchema},
  output: {schema: SuggestOptimalScheduleOutputSchema},
  prompt: `You are an AI assistant that analyzes comedy show data and suggests optimal scheduling times.

  Analyze the following show history data to identify patterns and suggest the best time to schedule future shows to maximize attendance and profitability.

  Show History Data:
  {{showHistory}}

  Consider factors such as day of the week, time of day, location, and performer popularity.

  Provide a clear suggestion and explain your reasoning.
  `,
});

const suggestOptimalScheduleFlow = ai.defineFlow(
  {
    name: 'suggestOptimalScheduleFlow',
    inputSchema: SuggestOptimalScheduleInputSchema,
    outputSchema: SuggestOptimalScheduleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
