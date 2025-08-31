import { useCallback, useEffect } from 'react';
import { useForm, useStore } from '@tanstack/react-form';
import z from 'zod';
import { useCreateTask, useUpdateTask, useUpdateTasksList } from '@/entities/tasks';
import { api } from '@/shared/api';
import { TasksModalSchema } from './schema';

type FormFields = z.infer<typeof TasksModalSchema>;

type Props = {
  setIsOpen: (val: boolean) => void;
  taskToEdit: api.Task | null;
};

export const useTasksModal = ({ setIsOpen, taskToEdit }: Props) => {
  const { mutate: mutateCreate, isPending: isCreatePending } = useCreateTask();
  const { mutate: mutateUpdate, isPending: isUpdatePending } = useUpdateTask();
  const { handleUpdateTasksList } = useUpdateTasksList();

  const handleSubmit = (data: FormFields) => {
    if (data.id) {
      mutateUpdate({ id: data.id, data }, handleActions());
    } else {
      mutateCreate(data, handleActions());
    }
  };

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      completed: false,
      id: undefined,
    } as FormFields,
    validators: {
      onChange: TasksModalSchema,
      onSubmit: TasksModalSchema,
    },
    onSubmit: data => {
      handleSubmit(data.value);
    },
  });

  const handleActions = useCallback(() => {
    return {
      onSuccess: () => {
        handleUpdateTasksList();
        setIsOpen(false);
        form.reset();
      },
    };
  }, [setIsOpen, form]);

  const isSubmitting = useStore(form.store, state => state.isSubmitting);

  const inProgress = isCreatePending || isUpdatePending || isSubmitting;

  useEffect(() => {
    form.setFieldValue('id', taskToEdit?.id || undefined);
    form.setFieldValue('title', taskToEdit?.title || '');
    form.setFieldValue('description', taskToEdit?.description || '');
    form.setFieldValue('completed', taskToEdit?.completed || false);
  }, [taskToEdit]);

  return {
    form,
    inProgress,
  };
};
