import { useMutation } from '@tanstack/react-query';
import api from '@/lib/axios';

export const useGetAllUsers = () => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await api.get('/users', {
        params: {
          limit: -1,
          sort_by: 'created_at',
          sort_order: 'desc',
        },
      });
      return data;
    },
  });
};