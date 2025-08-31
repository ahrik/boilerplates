import { useMutation } from '@tanstack/react-query';
import { api } from '@/shared/api';
import { CreateTask } from '@/shared/api/generated_api';
import { CREATE_TASK_MUTATION_KEY } from '../constants';

export const useCreateTask = () => {
  return useMutation({
    mutationKey: [CREATE_TASK_MUTATION_KEY],
    mutationFn: (data: CreateTask) => api.createTask(data),
  });
};
