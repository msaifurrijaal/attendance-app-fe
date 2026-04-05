import { useMutation } from '@tanstack/react-query';
import api from '@/lib/axios';

interface UploadImageResponse {
  message: string;
  data: {
    url: string;
  };
}

export const useUploadImage = () => {
  return useMutation({
    mutationFn: async (file: File): Promise<UploadImageResponse> => {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await api.post('/upload/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return data;
    },
  });
};