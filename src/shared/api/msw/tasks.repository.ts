import { nanoid } from 'nanoid';
import { Task } from '../generated_api';
import { persistStorage } from './persist-storage';

const STORAGE_KEY = 'tasks_storage';

export const tasksRepository = {
  getTasks: () => {
    return persistStorage.getItemSafe<Task[]>(STORAGE_KEY, []);
  },

  addTask: async (value: Omit<Task, 'id'>) => {
    const tasks = await tasksRepository.getTasks();
    const newTask = {
      ...value,
      id: nanoid(),
    };

    await persistStorage.setItemSafe<Task[]>(STORAGE_KEY, tasks.concat([newTask]));

    return newTask;
  },

  changeTask: async (taskId: string, value: Partial<Task>) => {
    const tasks = await tasksRepository.getTasks();
    const task = tasks.find(task => task.id === taskId);

    if (!task) {
      return Promise.reject('Task not found');
    }

    await persistStorage.setItemSafe<Task[]>(
      STORAGE_KEY,
      tasks.map(task => (task.id === taskId ? { ...task, ...value } : task))
    );
  },
};
