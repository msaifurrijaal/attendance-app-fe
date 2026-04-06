import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import dayjs from 'dayjs';

interface Attendance {
  id: string;
  user_id: string;
  check_in_time: string;
  check_out_time: string | null;
  check_in_photo: string | null;
  check_out_photo: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface GetLatestAttendanceResponse {
  message: string;
  data: Attendance[];
  meta: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

export const useGetLatestAttendance = (userId: string) => {
  const now = dayjs();
  const start_date = now.subtract(24, 'hour').toISOString();
  const end_date = now.add(24, 'hour').toISOString();

  return useQuery({
    queryKey: ['attendance-latest'],
    queryFn: async (): Promise<GetLatestAttendanceResponse> => {
      const { data } = await api.get('/attendances', {
        params: {
          page: 1,
          limit: 1,
          start_date,
          end_date,
          sort_by: 'created_at',
          sort_order: 'desc',
          user_id: userId,
        },
      });
      return data;
    },
  });
};