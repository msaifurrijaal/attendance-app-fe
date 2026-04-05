import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { Department } from '../types/department.type';

interface GetDepartmentsParams {
  page?: number;
  limit?: number;
  search?: string;
  with_deleted?: boolean;
  sort_by?: string;
  sort_order?: string;
}

interface GetDepartmentsResponse {
  message: string;
  data: Department[];
  meta: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

export const useGetDepartments = (params: GetDepartmentsParams) => {
  return useQuery({
    queryKey: ['departments', params],
    queryFn: async (): Promise<GetDepartmentsResponse> => {
      const { data } = await api.get('/departments', { params });
      return data;
    },
  });
};