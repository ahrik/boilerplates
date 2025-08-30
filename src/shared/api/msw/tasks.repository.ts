import { CreateTask, Task, UpdateTask } from '../generated_api';
import { persistStorage } from './persist-storage';

const TASKS_STORAGE_KEY = 'tasks_storsage';
export const tasksRepository = {
  getTasks: () => {
    return persistStorage.getItemSafe<Task[]>(TASKS_STORAGE_KEY, []);
  },

  getTaskById: async (id: number) => {
    const tasks = await persistStorage.getItemSafe<Task[]>(TASKS_STORAGE_KEY, []);

    return tasks.find(task => task.id === id) || null;
  },

  addTask: async (value: Omit<CreateTask, 'id'>) => {
    const tasks = await tasksRepository.getTasks();
    const newUser: Task = {
      ...value,
      completed: Boolean(value.completed),
      id: Date.now(),
    };
    await persistStorage.setItemSafe<Task[]>(TASKS_STORAGE_KEY, tasks.concat([newUser]));

    return newUser;
  },

  updateTask: async (id: number, value: UpdateTask) => {
    const tasks = await tasksRepository.getTasks();
    await persistStorage.setItemSafe<Task[]>(
      TASKS_STORAGE_KEY,
      tasks.map(item => {
        if (item.id === id) {
          return { ...item, ...value };
        }

        return item;
      })
    );

    return { ...value, id };
  },

  removeTask: async (id: number) => {
    const tasks = await tasksRepository.getTasks();
    await persistStorage.setItemSafe(
      TASKS_STORAGE_KEY,
      tasks.filter(task => task.id !== id)
    );
  },
};
