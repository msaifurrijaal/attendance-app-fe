import { z } from 'zod';

export const registerSchema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, 'Password must contain letters and numbers'),
  admin_code: z.string().min(1, 'Admin code is required'),
});

export type RegisterForm = z.infer<typeof registerSchema>;