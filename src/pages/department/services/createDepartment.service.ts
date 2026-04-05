import { useMutation } from '@tanstack/react-query';
import api from '@/lib/axios';
import { queryClient } from '@/lib/queryClient';
import type { DepartmentForm } from '../validations/schema';

export const useCreateDepartment = () => {
  return useMutation({
    mutationFn: async (payload: DepartmentForm) => {
      const { data } = await api.post('/departments', payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });
};