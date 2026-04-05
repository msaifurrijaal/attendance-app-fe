import { useMutation } from '@tanstack/react-query';
import api from '@/lib/axios';
import { queryClient } from '@/lib/queryClient';
import type { DepartmentForm } from '../validations/schema';

export const useUpdateDepartment = () => {
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: DepartmentForm }) => {
      const { data } = await api.patch(`/departments/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });
};