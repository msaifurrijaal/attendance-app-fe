import { useMutation } from '@tanstack/react-query';
import api from '@/lib/axios';

interface UpdatePasswordPayload {
  id: string;
  password: string;
}

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: async ({ id, password }: UpdatePasswordPayload) => {
      const { data } = await api.patch(`/users/${id}`, { password });
      return data;
    },
  });
};