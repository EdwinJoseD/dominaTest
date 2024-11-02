import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { TaskDomain, TaskDomainInterface } from '.';
import { Task, TaskInput } from '../models';
import { TaskRepository } from '../repository';

describe('should validate the taskDomain class', () => {
  let taskDomain: TaskDomainInterface;

  beforeEach(() => {
    taskDomain = new TaskDomain();
  });

  it('should get all tasks', async () => {
    const userId = 'userId';
    const tasks: Task[] = [
      {
        _id: 'id',
        title: 'title',
        description: 'description',
        userId,
      },
    ] as any;
    jest
      .spyOn(TaskRepository.prototype, 'findAllTasks')
      .mockResolvedValue(tasks);

    const result = await taskDomain.getAllTasks(userId);

    expect(result).toEqual(tasks);
  });

  it('should get a task by id', async () => {
    const id = 'id';
    const task: Task = {
      _id: id,
      title: 'title',
      description: 'description',
      userId: 'userId',
    } as any;
    jest
      .spyOn(TaskRepository.prototype, 'findTaskById')
      .mockResolvedValue(task);

    const result = await taskDomain.getTaskById(id);

    expect(result).toEqual(task);
  });

  it('should not get a task by id', async () => {
    const id = 'id';
    jest
      .spyOn(TaskRepository.prototype, 'findTaskById')
      .mockResolvedValue(null);

    try {
      await taskDomain.getTaskById(id);
    } catch (error: any) {
      expect(error.message).toBe('Task not found');
    }
  });

  it('should create a task', async () => {
    const taskInput: TaskInput = {
      title: 'title',
      description: 'description',
    };
    const userId = 'userId';
    const task: Task = {
      _id: 'id',
      title: taskInput.title,
      description: taskInput.description,
      userId,
    } as any;
    jest.spyOn(TaskRepository.prototype, 'createTask').mockResolvedValue(task);

    const result = await taskDomain.createTask(taskInput, userId);

    expect(result).toEqual(task);
  });

  it('should update a task', async () => {
    const id = 'id';
    const taskInput: TaskInput = {
      title: 'title',
      description: 'description',
    };
    const userId = 'userId';
    const task: Task = {
      _id: id,
      title: taskInput.title,
      description: taskInput.description,
      userId,
    } as any;
    jest
      .spyOn(TaskRepository.prototype, 'findTaskById')
      .mockResolvedValue(task);
    jest.spyOn(TaskRepository.prototype, 'updateTask').mockResolvedValue(true);

    const result = await taskDomain.updateTask(id, taskInput, userId);

    expect(result).toBeTruthy();
  });

  it('should not update a task when task not found', async () => {
    const id = 'id';
    const taskInput: TaskInput = {
      title: 'title',
      description: 'description',
    };
    const userId = 'userId';
    jest
      .spyOn(TaskRepository.prototype, 'findTaskById')
      .mockResolvedValue(null);

    try {
      await taskDomain.updateTask(id, taskInput, userId);
    } catch (error: any) {
      expect(error.message).toBe('Task not found');
    }
  });

  it('should not update a task when unauthorized', async () => {
    const id = 'id';
    const taskInput: TaskInput = {
      title: 'title',
      description: 'description',
    };
    const userId = 'userId';
    const task: Task = {
      _id: id,
      title: taskInput.title,
      description: taskInput.description,
      userId: 'anotherUserId',
    } as any;
    jest
      .spyOn(TaskRepository.prototype, 'findTaskById')
      .mockResolvedValue(task);

    try {
      await taskDomain.updateTask(id, taskInput, userId);
    } catch (error: any) {
      expect(error.message).toBe('Unauthorized');
    }
  });

  it('should delete a task', async () => {
    const id = 'id';
    const task: Task = {
      _id: id,
      title: 'title',
      description: 'description',
      userId: 'userId',
    } as any;
    jest
      .spyOn(TaskRepository.prototype, 'findTaskById')
      .mockResolvedValue(task);
    jest.spyOn(TaskRepository.prototype, 'deleteTask').mockResolvedValue(true);

    const result = await taskDomain.deleteTask(id);

    expect(result).toBeTruthy();
  });

  it('should not delete a task when task not found', async () => {
    const id = 'id';
    jest
      .spyOn(TaskRepository.prototype, 'findTaskById')
      .mockResolvedValue(null);

    try {
      await taskDomain.deleteTask(id);
    } catch (error: any) {
      expect(error.message).toBe('Task not found');
    }
  });
});
