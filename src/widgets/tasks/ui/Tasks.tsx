import { AllTasks } from '@/features/tasks/all-tasks';
import { TasksModal } from '@/features/tasks/tasks-modal';
import { useTasks } from '../model/useTasks';

export const Tasks = () => {
  const { isOpen, setIsOpen, setTaskToEdit, taskToEdit } = useTasks();

  return (
    <>
      <AllTasks setTaskToEdit={setTaskToEdit} setIsOpen={setIsOpen} />
      <TasksModal isOpen={isOpen} setIsOpen={setIsOpen} taskToEdit={taskToEdit} />
    </>
  );
};
