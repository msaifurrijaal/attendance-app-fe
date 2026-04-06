import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';

interface GetAttendancesParams {
  page?: number;
  limit?: number;
  search?: string;
  start_date?: string;
  end_date?: string;
  user_id?: string;
}

export const useGetAttendances = (params: GetAttendancesParams) => {
  return useQuery({
    queryKey: ['attendances', params],
    queryFn: async () => {
      const { data } = await api.get('/attendances', { params });
      return data;
    },
  });
};