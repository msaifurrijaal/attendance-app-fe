import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { User } from '../types/employee.type';

interface GetUsersParams {
  search?: string;
  department_id?: string;
  page?: number;
  limit?: number;
}

interface GetUsersResponse {
  message: string;
  data: User[];
  meta: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

export const useGetUsers = (params: GetUsersParams) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: async (): Promise<GetUsersResponse> => {
      const { data } = await api.get('/users', {
        params,
      });
      return data;
    },
  });
};