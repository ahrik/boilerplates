import { useState } from 'react';
import { type CreateTask, createTask } from '@shared/api/generated_api';

export const useAddTask = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addTask = async (task: CreateTask) => {
    setIsLoading(true);

    try {
      const response = await createTask(task);

      return response;
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Something went wrong');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addTask,
    isLoading,
    error,
  };
};
