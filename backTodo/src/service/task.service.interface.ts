/**
 * TaskServiceInterface interface for TaskService
 * @interface TaskServiceInterface
 * @function validateToken
 * @param token string
 * @returns Promise<boolean>
 */
export interface TaskServiceInterface {
  /**
   * validateToken function for TaskService
   * @param token string
   * @returns Promise<boolean>
   */
  validateToken(token: string): Promise<boolean>;
}
