import { useMutation } from '@tanstack/react-query';
import type { LoginForm } from '../validations/schema';
import api from '@/lib/axios';

interface LoginResponse {
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
  }

}

const URL = '/auth/login';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (payload: LoginForm): Promise<LoginResponse> => {
      const { data } = await api.post(URL, payload);
      return data;
    },
  });
};