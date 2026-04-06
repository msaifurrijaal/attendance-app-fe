import { useMutation } from '@tanstack/react-query';
import api from '@/lib/axios';
import { queryClient } from '@/lib/queryClient';

interface CheckOutPayload {
  check_out_time: string;
  check_out_photo: string;
}

export const useCheckOut = () => {
  return useMutation({
    mutationFn: async (payload: CheckOutPayload) => {
      const { data } = await api.post('/attendances/check-out', payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance-latest'] });
    },
  });
};