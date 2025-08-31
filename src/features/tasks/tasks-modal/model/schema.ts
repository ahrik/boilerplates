import { z } from 'zod';

export const TasksModalSchema = z.object({
  title: z.string().min(2, { error: 'Too short title' }).max(50, { error: 'Too long title' }),
  description: z
    .string()
    .min(5, { message: 'Description is too short' })
    .max(20, { message: 'Description is too long' }),
  completed: z.boolean(),
  id: z.number().positive().optional(),
});
