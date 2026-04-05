import { useInfiniteQuery } from '@tanstack/react-query';
import api from '@/lib/axios';

export const useFetchInfiniteRole = (search: string) => {
  return useInfiniteQuery({
    queryKey: ['roles-infinite', search],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await api.get('/roles', {
        params: { page: pageParam, limit: 10, search: search || undefined },
      });
      return data;
    },
    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage.meta;
      return page < total_pages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });
};