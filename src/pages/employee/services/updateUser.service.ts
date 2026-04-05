import { useMutation } from '@tanstack/react-query';
import api from '@/lib/axios';
import { queryClient } from '@/lib/queryClient';
import type { EmployeeForm } from '../validations/schema';

interface Payload extends Omit<EmployeeForm, 'password' | 'role_id' | 'department_id'> {
  role_id: string;
  department_id: string;
}

interface UpdateUserParams {
  id: string;
  payload: Payload;
}

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: async ({ id, payload }: UpdateUserParams) => {
      const modifiedPayload = {
        ...payload,
        phone: payload.phone || null,
        address: payload.address || null,
        image_url: payload.image_url || null,
        position: payload.position || null
      }
      const { data } = await api.patch(`/users/${id}`, modifiedPayload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};