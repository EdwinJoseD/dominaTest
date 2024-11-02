import { Task, TaskInput } from '../models';
import { TaskRepository, TaskRepositoryInterface } from '../repository';
import { AppError, HttpCode } from '../helpers';
import { TaskDomainInterface } from '.';

/**
 * AuthDomain class that implements AuthDomainInterface
 * This class is responsible for handling all the business logic related to the authentication
 * @class AuthDomain
 * @method login - logs in a user
 * @method register - registers a user
 */
export class TaskDomain implements TaskDomainInterface {
  private taskRepository: TaskRepositoryInterface;

  constructor() {
    this.taskRepository = new TaskRepository();
  }
  async getAllTasks(userId: string): Promise<Task[]> {
    return await this.taskRepository.findAllTasks(userId);
  }
  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findTaskById(id);
    if (!task) {
      throw new AppError({
        message: 'Task not found',
        status: HttpCode.BAD_REQUEST,
      });
    }
    return task;
  }

  async updateTask(
    id: string,
    task: TaskInput,
    userId: string
  ): Promise<boolean> {
    const taskToUpdate = await this.taskRepository.findTaskById(id);
    if (!taskToUpdate) {
      throw new AppError({
        message: 'Task not found',
        status: HttpCode.BAD_REQUEST,
      });
    }
    if (taskToUpdate.userId !== userId) {
      throw new AppError({
        message: 'Unauthorized',
        status: HttpCode.UNAUTHORIZED,
      });
    }
    const taskToUpdated = {
      ...task,
      userId,
    };
    return await this.taskRepository.updateTask(id, taskToUpdated);
  }

  async deleteTask(id: string): Promise<boolean> {
    const taskToDelete = await this.taskRepository.findTaskById(id);
    if (!taskToDelete) {
      throw new AppError({
        message: 'Task not found',
        status: HttpCode.BAD_REQUEST,
      });
    }
    return await this.taskRepository.deleteTask(id);
  }

  async createTask(taskInput: TaskInput, userId: string): Promise<Task> {
    const taskToCreate = {
      ...taskInput,
      userId,
    };
    return await this.taskRepository.createTask(taskToCreate);
  }
}
