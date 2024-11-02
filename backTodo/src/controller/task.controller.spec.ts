import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import app from '../config/app';
import request from 'supertest';
import { ResponseApi, HttpCode } from '../helpers';
import { TaskDomain } from '../domain';
import { Task, TaskInput } from '../models';
import { TaskService } from '../service/task.service';

const { PREFIX } = process.env;
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJpYXQiOjE2NjkwNTkzMTJ9.elaCjIP_9qjELUf6K_sxM3YTdAhqsws8Tn5j9sGsuYU';

describe('should validate the task controller', () => {
  beforeEach(() => {
    jest.spyOn(TaskService.prototype, 'validateToken').mockResolvedValue(true);
  });

  it('should validate the create task method', async () => {
    const task: TaskInput = {
      title: 'Test',
      description: 'Test',
      completed: false,
    };
    const responseApi: ResponseApi<Task> = {
      status: HttpCode.CREATED,
      data: {
        ...task,
        _id: '1',
      } as any,
    };
    jest.spyOn(TaskDomain.prototype, 'createTask').mockResolvedValue({
      ...task,
      _id: '1',
    } as any);
    const response = await request(app)
      .post(`${PREFIX}/api/task`)
      .send(task)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(HttpCode.CREATED);
    expect(response.body).toEqual(responseApi);
  });

  it('should validate the get all tasks method', async () => {
    const tasks: Task[] = [
      {
        _id: '1',
        title: 'Test',
        description: 'Test',
        completed: false,
      } as any,
    ];
    const responseApi: ResponseApi<Task[]> = {
      status: HttpCode.OK,
      data: tasks,
    };
    jest.spyOn(TaskDomain.prototype, 'getAllTasks').mockResolvedValue(tasks);
    const response = await request(app)
      .get(`${PREFIX}/api/task`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(HttpCode.OK);
    expect(response.body).toEqual(responseApi);
  });

  it('should validate the get task by id method', async () => {
    const task: Task = {
      _id: '1',
      title: 'Test',
      description: 'Test',
      completed: false,
    } as any;
    const responseApi: ResponseApi<Task> = {
      status: HttpCode.OK,
      data: task,
    };
    jest.spyOn(TaskDomain.prototype, 'getTaskById').mockResolvedValue(task);
    const response = await request(app)
      .get(`${PREFIX}/api/task/1`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(HttpCode.OK);
    expect(response.body).toEqual(responseApi);
  });

  it('should validate the update task method', async () => {
    const task: TaskInput = {
      title: 'Test',
      description: 'Test',
      completed: false,
    };
    const responseApi: ResponseApi<boolean> = {
      status: HttpCode.OK,
      data: true,
    };
    jest.spyOn(TaskDomain.prototype, 'updateTask').mockResolvedValue(true);
    const response = await request(app)
      .put(`${PREFIX}/api/task/1`)
      .send(task)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(HttpCode.OK);
    expect(response.body).toEqual(responseApi);
  });

  it('should validate the delete task method', async () => {
    const responseApi: ResponseApi<boolean> = {
      status: HttpCode.OK,
      data: true,
    };
    jest.spyOn(TaskDomain.prototype, 'deleteTask').mockResolvedValue(true);
    const response = await request(app)
      .delete(`${PREFIX}/api/task/1`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(HttpCode.OK);
    expect(response.body).toEqual(responseApi);
  });
});
