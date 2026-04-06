import { useMutation } from '@tanstack/react-query';
import api from '@/lib/axios';
import { queryClient } from '@/lib/queryClient';

interface CheckInPayload {
  check_in_time: string;
  check_in_photo: string;
}

export const useCheckIn = () => {
  return useMutation({
    mutationFn: async (payload: CheckInPayload) => {
      const { data } = await api.post('/attendances/check-in', payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance-latest'] });
    },
  });
};