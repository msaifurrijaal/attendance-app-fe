import { z } from 'zod';

export const employeeSchema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, 'Password must contain letters and numbers'),
  role_id: z.object({
    id: z.string().min(1, 'Role is required'),
    name: z.string().min(1, 'Role is required'),
  }),
  department_id: z.object({
    id: z.string().min(1, 'Department is required'),
    name: z.string().min(1, 'Department is required'),
  }),
  phone: z.string().optional(),
  address: z.string().optional(),
  position: z.string().optional(),
  image_url: z.string().optional(),
});

export type EmployeeForm = z.infer<typeof employeeSchema>;