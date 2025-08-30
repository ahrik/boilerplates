import { useQuery } from '@tanstack/react-query';
import { getTaskById } from '@/shared/api/generated_api';
import { GET_TASK_QUERY_KEY } from '../constants';

export const useTask = (id: number) => {
  return useQuery({
    queryKey: [GET_TASK_QUERY_KEY, id],
    queryFn: () => getTaskById(id),
  });
};
