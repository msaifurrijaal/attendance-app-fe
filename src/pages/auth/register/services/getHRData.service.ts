import { useMutation } from '@tanstack/react-query';
import api from '@/lib/axios';

export const useGetHRRoleAndDepartment = () => {
  return useMutation({
    mutationFn: async () => {
      const [roleRes, deptRes] = await Promise.all([
        api.get('/roles/admin-hr'),
        api.get('/departments/hr'),
      ]);

      return {
        role: roleRes.data.data,
        department: deptRes.data.data,
      };
    },
  });
};