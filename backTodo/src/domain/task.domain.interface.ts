import { Task, TaskInput } from '../models';

/**
 * Interface for the TaskDomain class
 * @interface TaskDomainInterface
 */
export interface TaskDomainInterface {
  /**
   * Gets all tasks
   * @param {string} userId - The id of the user
   * @returns {Promise<Task[]>} All tasks
   */
  getAllTasks(userId: string): Promise<Task[]>;

  /**
   * Gets a task by id
   * @param {string} id - The id of the task
   * @returns {Promise<Task>} The task
   */
  getTaskById(id: string): Promise<Task>;

  /**
   * Creates a task
   * @param {TaskInput} task - The task to create
   * @param {string} userId - The id of the user
   * @returns {Promise<Task>} The created task
   */
  createTask(task: TaskInput, userId: string): Promise<Task>;

  /**
   * Updates a task
   * @param {string} id - The id of the task
   * @param {TaskInput} task - The task to update
   * @param {string} userId - The id of the user
   * @returns {Promise<boolean>} The updated task
   */
  updateTask(id: string, task: TaskInput, userId: string): Promise<boolean>;

  /**
   * Deletes a task
   * @param {string} id - The id of the task
   * @returns {Promise<boolean>} The deleted task
   */
  deleteTask(id: string): Promise<boolean>;
}
