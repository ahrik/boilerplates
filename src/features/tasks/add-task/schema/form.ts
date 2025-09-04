import { z } from 'zod';
import { TaskStatus } from '@shared/api/generated_api';

const taskStatusEnum = Object.values(TaskStatus);

export const addTaskFormFieldsSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }).max(100, { message: 'Title is too long' }),
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .max(1000, { message: 'Description is too long' })
    .optional(),
  status: z.enum(taskStatusEnum).optional(),
  dueDate: z
    .string()
    .optional()
    .refine(val => !val || !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    }),
  reason: z.string().optional(),
});

export type TaskFormValues = z.infer<typeof addTaskFormFieldsSchema>;
