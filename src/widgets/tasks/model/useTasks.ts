import { useState } from 'react';
import { api } from '@/shared/api';

export const useTasks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<api.Task | null>(null);

  return {
    isOpen,
    setIsOpen,
    taskToEdit,
    setTaskToEdit,
  };
};
