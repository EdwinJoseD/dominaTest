import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { TaskModel, Task, TaskInput } from '../models';
import { TaskRepository, TaskRepositoryInterface } from '.';

describe('should validate task repository', () => {
  let taskRepository: TaskRepositoryInterface;

  beforeEach(() => {
    taskRepository = new TaskRepository();
  });

  it('should create a task', async () => {
    const taskInput: TaskInput = {
      userId: '1',
      title: 'Test',
      description: 'Test',
      completed: false,
    };
    jest.spyOn(TaskModel, 'create').mockResolvedValue({
      ...taskInput,
      _id: '1',
    } as any);
    const task: Task = await taskRepository.createTask(taskInput);
    expect(task).toBeDefined();
    expect(task._id).toBe('1');
  });

  it('should find a task by id', async () => {
    const task: Task = {
      _id: '1',
      userId: '1',
      title: 'Test',
      description: 'Test',
      completed: false,
    } as any;
    jest.spyOn(TaskModel, 'findOne').mockResolvedValue(task as any);
    const foundTask: Task | null = await taskRepository.findTaskById('1');
    expect(foundTask).toBeDefined();
    expect(foundTask?._id).toBe('1');
  });

  it('should find all tasks', async () => {
    const tasks: Task[] = [
      {
        _id: '1',
        userId: '1',
        title: 'Test',
        description: 'Test',
        completed: false,
      } as any,
    ];
    jest.spyOn(TaskModel, 'find').mockResolvedValue(tasks as any);
    const foundTasks: Task[] = await taskRepository.findAllTasks('1');
    expect(foundTasks).toBeDefined();
    expect(foundTasks.length).toBe(1);
    expect(foundTasks[0]._id).toBe('1');
  });

  it('should update a task', async () => {
    jest
      .spyOn(TaskModel, 'updateOne')
      .mockResolvedValue({ modifiedCount: 1 } as any);
    const updated: boolean = await taskRepository.updateTask('1', {
      title: 'Test',
      description: 'Test',
      completed: true,
    });
    expect(updated).toBeTruthy();
  });

  it('should delete a task', async () => {
    jest
      .spyOn(TaskModel, 'deleteOne')
      .mockResolvedValue({ deletedCount: 1 } as any);
    const deleted: boolean = await taskRepository.deleteTask('1');
    expect(deleted).toBeTruthy();
  });
});
