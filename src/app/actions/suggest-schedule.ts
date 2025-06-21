'use server';

import { suggestOptimalSchedule, SuggestOptimalScheduleInput, SuggestOptimalScheduleOutput } from '@/ai/flows/suggest-optimal-schedule';
import { z } from 'zod';

const formSchema = z.object({
  showHistory: z.string(),
});

type Result = {
  success: boolean;
  data?: SuggestOptimalScheduleOutput;
  error?: string;
};

export async function suggestScheduleAction(
  values: SuggestOptimalScheduleInput
): Promise<Result> {
  const validatedFields = formSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid input.',
    };
  }

  try {
    const output = await suggestOptimalSchedule(validatedFields.data);
    return {
      success: true,
      data: output,
    };
  } catch (error) {
    console.error('Error in suggestOptimalSchedule flow:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}
