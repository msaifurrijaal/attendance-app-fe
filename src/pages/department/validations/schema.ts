import { z } from 'zod';

export const departmentSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  name: z.string().min(1, 'Name is required'),
});

export type DepartmentForm = z.infer<typeof departmentSchema>;