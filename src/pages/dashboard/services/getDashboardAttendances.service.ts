import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import dayjs from 'dayjs';

type FilterType = 'today' | 'week' | 'month';

const getDateRange = (filter: FilterType) => {
  const now = dayjs();

  switch (filter) {
    case 'today':
      return {
        start_date: now.startOf('day').toISOString(),
        end_date: now.endOf('day').toISOString(),
      };
    case 'week':
      return {
        start_date: now.startOf('week').toISOString(),
        end_date: now.endOf('week').toISOString(),
      };
    case 'month':
      return {
        start_date: now.startOf('month').toISOString(),
        end_date: now.endOf('month').toISOString(),
      };
  }
};

export const useGetDashboardAttendances = (filter: FilterType) => {
  const { start_date, end_date } = getDateRange(filter);

  return useQuery({
    queryKey: ['dashboard-attendances', filter],
    queryFn: async () => {
      const { data } = await api.get('/attendances', {
        params: {
          limit: -1,
          start_date,
          end_date,
          sort_by: 'created_at',
          sort_order: 'desc',
        },
      });
      return data;
    },
  });
};