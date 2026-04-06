import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';

interface GetEmployeeAttendancesParams {
  page?: number;
  limit?: number;
  user_id?: string;
  department_id?: string;
  start_date?: string;
  end_date?: string;
}

export const useGetEmployeeAttendances = (params: GetEmployeeAttendancesParams) => {
  return useQuery({
    queryKey: ['employee-attendances', params],
    queryFn: async () => {
      const { data } = await api.get('/attendances', { params });
      return data;
    },
  });
};