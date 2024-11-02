import { ResponseApi } from '../helpers';
import Axios from 'axios';
import { TaskServiceInterface } from './task.service.interface';

const { URI_AUTH } = process.env;

/**
 * TaskService class for TaskServiceInterface
 * @class TaskService
 * @implements TaskServiceInterface
 */
export class TaskService implements TaskServiceInterface {
  /**
   * validateToken function for TaskService
   * @param token string
   * @returns Promise<boolean>
   */
  async validateToken(token: string): Promise<boolean> {
    try {
      const url = `${URI_AUTH}/verify`;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const { data, status } = await Axios.get<ResponseApi<boolean>>(url, {
        headers,
      });
      return data.data;
    } catch (error) {
      return false;
    }
  }
}
