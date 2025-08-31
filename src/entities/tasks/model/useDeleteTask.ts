import { useMutation } from '@tanstack/react-query';
import { api } from '@/shared/api';
import { DELETE_TASK_MUTATION_KEY } from '../constants';

export const useDeleteTask = () => {
  return useMutation({
    mutationKey: [DELETE_TASK_MUTATION_KEY],
    mutationFn: (id: number) => api.deleteTask(id),
  });
};
