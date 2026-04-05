import { useMutation } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { UserMe } from '@/types/user.type';

interface FetchUserMeResponse {
  message: string;
  user: UserMe;
}

const URL = '/auth/me';

export const useFetchUserMe = () => {
  return useMutation({
    mutationFn: async (): Promise<FetchUserMeResponse> => {
      const { data } = await api.get(URL);
      return data;
    },
  });
};