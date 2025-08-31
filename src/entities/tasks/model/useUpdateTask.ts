import { useMutation } from '@tanstack/react-query';
import { api } from '@/shared/api';
import { UpdateTask } from '@/shared/api/generated_api';
import { UPDATE_TASK_MUTATION_KEY } from '../constants';

type UpdateTaskPayload = {
  id: number;
  data: UpdateTask;
};

export const useUpdateTask = () => {
  return useMutation({
    mutationKey: [UPDATE_TASK_MUTATION_KEY],
    mutationFn: (obj: UpdateTaskPayload) => api.updateTask(obj.id, obj.data),
  });
};
