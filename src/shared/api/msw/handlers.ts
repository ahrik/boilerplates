import { delay, http, HttpResponse } from 'msw';
import { CreateTask, CreateUser, SignIn, UpdateTask } from '../generated_api';
import { sessionRepository } from './session.repository';
import { tasksRepository } from './tasks.repository';
import { usersRepository } from './users.repository';

const needAuthorization = async () => {
  return new HttpResponse(null, {
    status: 401,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const unauthorized = async () => {
  return new HttpResponse(null, {
    status: 403,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const ok = async (body?: unknown) => {
  return new HttpResponse(body ? JSON.stringify(body) : null, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getHandlers = async () => {
  const users = await usersRepository.getUsers();

  if (users.length === 0) {
    await usersRepository.addUser({
      name: 'Администрюк',
      email: 'admin@mail.com',
      password: 'admin123',
      role: 'admin',
    });
  }

  return [
    http.get('/api/users', async () => {
      await delay(1000);
      const sesson = await sessionRepository.getSession();

      if (!sesson) {
        return needAuthorization();
      }

      const users = await usersRepository.getUsers();

      return ok(users);
    }),

    http.post('/api/users', async ({ request }) => {
      await delay(1000);
      const sesson = await sessionRepository.getSession();

      if (!sesson) {
        return needAuthorization();
      }

      if (sesson.role !== 'admin') {
        return unauthorized();
      }

      const body = await request.json();

      const newUser = await usersRepository.addUser(body as CreateUser);

      await delay(1000);

      return ok(newUser);
    }),

    http.delete('/api/users/:userId', async ({ params }) => {
      const userId = params.userId as string;

      await usersRepository.removeUser(userId);

      await delay(1000);

      return ok();
    }),

    http.get('/api/session/me', async () => {
      await delay(1000);
      const sesson = await sessionRepository.getSession();

      if (!sesson) {
        return needAuthorization();
      }

      return ok(sesson);
    }),

    http.post('/api/session/sign-in', async ({ request }) => {
      const body = await request.json();

      const res = await sessionRepository.signIn(body as SignIn);

      if (!res) return needAuthorization();

      await delay(1000);

      return ok(res);
    }),

    http.post('/api/session/sign-out', async () => {
      await delay(1000);
      const sesson = await sessionRepository.getSession();

      if (!sesson) {
        return needAuthorization();
      }

      await sessionRepository.signOut();

      return ok();
    }),

    http.get('/api/tasks', async () => {
      await delay(1000);
      const sesson = await sessionRepository.getSession();

      if (!sesson) {
        return needAuthorization();
      }

      const tasks = await tasksRepository.getTasks();

      return ok(tasks);
    }),

    http.get('/api/tasks/:id', async ({ params }) => {
      await delay(1000);
      const sesson = await sessionRepository.getSession();

      if (!sesson) {
        return needAuthorization();
      }

      const id = Number(params.id);

      const task = await tasksRepository.getTaskById(id);

      return ok(task);
    }),

    http.post('/api/tasks', async ({ request }) => {
      const sesson = await sessionRepository.getSession();

      if (!sesson) {
        return needAuthorization();
      }

      if (sesson.role !== 'admin') {
        return unauthorized();
      }

      const body = await request.json();

      const newTask = await tasksRepository.addTask(body as CreateTask);

      return ok(newTask);
    }),

    http.patch('/api/tasks/:id', async ({ request, params }) => {
      const sesson = await sessionRepository.getSession();

      if (!sesson) {
        return needAuthorization();
      }

      if (sesson.role !== 'admin') {
        return unauthorized();
      }

      const id = Number(params.id);

      const body = await request.json();

      const updatedTask = await tasksRepository.updateTask(id, body as UpdateTask);

      return ok(updatedTask);
    }),

    http.delete('/api/tasks/:id', async ({ params }) => {
      const sesson = await sessionRepository.getSession();

      if (!sesson) {
        return needAuthorization();
      }

      if (sesson.role !== 'admin') {
        return unauthorized();
      }

      const id = Number(params.id);
      await tasksRepository.removeTask(id);

      return ok();
    }),
  ];
};
