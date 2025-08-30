import { useQuery } from '@tanstack/react-query';
import { getTasks } from '@/shared/api/generated_api';
import { GET_TASKS_QUERY_KEY } from '../constants';

export const useTasks = () => {
  return useQuery({
    queryKey: [GET_TASKS_QUERY_KEY],
    queryFn: getTasks,
  });
};
