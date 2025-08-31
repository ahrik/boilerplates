import { Dialog, Portal } from '@ark-ui/react';
import { api } from '@/shared/api';
import { AppCheckbox, AppInput, AppTextarea, FormProvider } from '@/shared/tanstack-fields';
import { Button } from '@/shared/ui/Button';
import { useTasksModal } from '../model/useTasksModal';

type Props = {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
  taskToEdit: api.Task | null;
};

export const TasksModal = ({ isOpen, setIsOpen, taskToEdit }: Props) => {
  const { form, inProgress } = useTasksModal({ setIsOpen, taskToEdit });

  return (
    <Dialog.Root lazyMount open={isOpen} onOpenChange={event => setIsOpen(event.open)}>
      <Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-200" />
        <Dialog.Positioner>
          <Dialog.Content
            className={`
            fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2
            rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5
            focus:outline-none
            animate-in fade-in-80 slide-in-from-bottom-8
          `}
          >
            <Dialog.Title>Tasks</Dialog.Title>
            <FormProvider form={form}>
              <AppInput name="title" label="Title" />
              <AppTextarea name="description" label="Description" />
              <AppCheckbox name="completed" label="Completed" />
              <div className="flex justify-center gap-3">
                <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
                <Button type="submit" disabled={inProgress} loading={inProgress}>
                  {taskToEdit ? 'Update' : 'Create'}
                </Button>
              </div>
            </FormProvider>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
