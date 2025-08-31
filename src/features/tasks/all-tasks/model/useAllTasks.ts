import { useDeleteTask, useTasks, useUpdateTasksList } from '@/entities/tasks';
import { api } from '@/shared/api';

type Props = {
  setTaskToEdit: (val: api.Task | null) => void;
  setIsOpen: (val: boolean) => void;
};

export const useAllTasks = ({ setIsOpen, setTaskToEdit }: Props) => {
  const { data, isFetching, error } = useTasks();
  const { mutate, isPending } = useDeleteTask();
  const { handleUpdateTasksList } = useUpdateTasksList();

  const handleCreateClick = () => {
    setTaskToEdit(null);
    setIsOpen(true);
  };

  const handleEditClick = (val: api.Task) => {
    setTaskToEdit(val);
    setIsOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        handleUpdateTasksList();
      },
    });
  };

  const isLoading = isFetching || isPending;

  return {
    data,
    isFetching,
    error,
    isPending,
    isLoading,
    handleCreateClick,
    handleEditClick,
    handleDeleteClick,
  };
};
