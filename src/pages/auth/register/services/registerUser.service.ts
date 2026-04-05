import { useMutation } from '@tanstack/react-query';
import api from '@/lib/axios';
import { queryClient } from '@/lib/queryClient';
import type { UserMe } from '@/types/user.type';

interface RegisterUserPayload {
  full_name: string;
  email: string;
  password: string;
  role_id: string;
  department_id: string;
  phone?: string;
  address?: string;
  image_url?: string;
  position?: string;
}

interface User extends Omit<UserMe, 'role_id' | 'department_id'> {
  role_id: string;
  department_id: string;
}

interface RegisterUserResponse {
  message: string;
  user: User;
}

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: async (payload: RegisterUserPayload): Promise<RegisterUserResponse> => {
      const modifiedPayload = {
        ...payload,
        phone: payload.phone || null,
        address: payload.address || null,
        image_url: payload.image_url || null,
        position: payload.position || null
      }
      const { data } = await api.post('/auth/register', modifiedPayload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};