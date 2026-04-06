import { z } from 'zod';

export const attendanceSchema = z.object({
  image_url: z.string().min(1, 'Photo is required'),
});

export type AttendanceForm = z.infer<typeof attendanceSchema>;