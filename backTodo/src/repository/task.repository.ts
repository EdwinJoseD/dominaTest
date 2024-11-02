import { Task, TaskInput, TaskModel } from '../models';
import { TaskRepositoryInterface } from './task.repository.interface';

/**
 * TaskRepository class that implements the TaskRepositoryInterface
 * @class TaskRepository
 * @implements TaskRepositoryInterface
 */
export class TaskRepository implements TaskRepositoryInterface {
  /**
   * @method createTask - Creates a new task
   * @param {TaskInput} task - TaskInput
   * @returns {Promise<Task>} - Promise<Task>
   */
  async createTask(task: TaskInput): Promise<Task> {
    return TaskModel.create(task);
  }

  /**
   * @method findTaskById - Finds a task by id
   * @param {string} id - string
   * @returns {Promise<Task | null>} - Promise<Task | null>
   */
  async findTaskById(id: string): Promise<Task | null> {
    return TaskModel.findOne({ _id: id }).catch(() => null);
  }

  /**
   * @method findAllTasks - Finds all tasks
   * @param {string} userId - string
   * @returns {Promise<Task[]>} - Promise<Task[]>
   */
  async findAllTasks(userId: string): Promise<Task[]> {
    return TaskModel.find({ userId });
  }

  /**
   * @method updateTask - Updates a task
   * @param {string} id - string
   * @param {TaskInput} task - TaskInput
   * @returns {Promise<boolean>} - Promise<boolean>
   */
  async updateTask(id: string, task: TaskInput): Promise<boolean> {
    const { modifiedCount } = await TaskModel.updateOne({ _id: id }, task);
    return modifiedCount > 0;
  }

  /**
   * @method deleteTask - Deletes a task
   * @param {string} id - string
   * @returns {Promise<boolean>} - Promise<boolean>
   */
  async deleteTask(id: string): Promise<boolean> {
    const { deletedCount } = await TaskModel.deleteOne({ _id: id });
    return deletedCount > 0;
  }
}
