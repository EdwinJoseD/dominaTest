import { Task, TaskInput } from '../models';

/**
 * Interface for the TaskRepository class
 * @interface TaskRepositoryInterface
 */
export interface TaskRepositoryInterface {
  /**
   * Creates a new task
   * @param task - TaskInput
   * @returns Promise<Task>
   */
  createTask(task: TaskInput): Promise<Task>;

  /**
   * Finds a task by id
   * @param id - string
   * @returns Promise<Task | null>
   */
  findTaskById(id: string): Promise<Task | null>;

  /**
   * Finds all tasks
   * @param userId - string
   * @returns Promise<Task[]>
   */
  findAllTasks(userId: string): Promise<Task[]>;

  /**
   * Updates a task
   * @param id - string
   * @param task - TaskInput
   * @returns Promise<boolean>
   */
  updateTask(id: string, task: TaskInput): Promise<boolean>;

  /**
   * Deletes a task
   * @param id - string
   * @returns Promise<boolean>
   */
  deleteTask(id: string): Promise<boolean>;
}
