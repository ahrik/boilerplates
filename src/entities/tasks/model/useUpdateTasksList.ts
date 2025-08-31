import { useQueryClient } from '@tanstack/react-query';
import { GET_TASKS_QUERY_KEY } from '../constants';

export const useUpdateTasksList = () => {
  const queryClient = useQueryClient();

  const handleUpdateTasksList = () => {
    queryClient.invalidateQueries({ queryKey: [GET_TASKS_QUERY_KEY] });
  };

  return {
    handleUpdateTasksList,
  };
};
