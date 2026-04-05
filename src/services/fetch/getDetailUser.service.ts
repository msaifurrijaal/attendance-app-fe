import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { User } from '@/pages/employee/types/employee.type';

interface DetailUserResponse {
  message: string;
  user: User
}

export const useGetDetailUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async (): Promise<DetailUserResponse> => {
      const { data } = await api.get(`/users/${id}`);
      return data;
    },
    enabled: !!id,
  });
};