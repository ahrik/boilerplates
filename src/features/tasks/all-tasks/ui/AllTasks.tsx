import { CheckCircle2, Circle, Pencil, Trash2 } from 'lucide-react';
import { VirtualList } from '@/entities/virtual-list';
import { api } from '@/shared/api';
import { Button } from '@/shared/ui/Button';
import { Spinner } from '@/shared/ui/spinner';
import { useAllTasks } from '../model/useAllTasks';

type Props = {
  setTaskToEdit: (val: api.Task | null) => void;
  setIsOpen: (val: boolean) => void;
};

export const AllTasks = ({ setTaskToEdit, setIsOpen }: Props) => {
  const { isLoading, data, handleCreateClick, handleEditClick, handleDeleteClick } = useAllTasks({
    setIsOpen,
    setTaskToEdit,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (!data?.length) {
    return (
      <p>
        No Available Tasks
        <Button className="bg-blue-500" onClick={handleCreateClick}>
          Create
        </Button>
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-4">Tasks List ({data.length})</h2>
        <Button className="bg-blue-500" onClick={handleCreateClick}>
          Create
        </Button>
      </div>
      <VirtualList<api.Task>
        data={data || []}
        itemHeight={96}
        parentHeight="600px"
        overscan={5}
        renderItemClassname="pb-2"
        children={(_virtualRow, task) => {
          return (
            <div className="flex items-start justify-between bg-white p-4 rounded-2xl shadow">
              <div className="flex items-start gap-3">
                <button className="mt-1 text-gray-500 hover:text-green-600">
                  {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </button>
                <div>
                  <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <Pencil className="w-5 h-5 text-blue-600" onClick={() => handleEditClick(task)} />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100" onClick={() => handleDeleteClick(task.id)}>
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};
