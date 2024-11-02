import { describe, expect, it, jest } from '@jest/globals';
import { HttpCode, ResponseApi } from '../helpers';
//************* helpers *********************************//
import Axios from 'axios';
//******************* mocks ******************************//
jest.mock('axios');
const mockedAxios = Axios as jest.Mocked<typeof Axios>;

import { TaskService, TaskServiceInterface } from '.';

describe('should validate TaskService', () => {
  it('should valdiate token', async () => {
    const token = 'token';
    jest.spyOn(Axios, 'get').mockResolvedValue({} as any);
    mockedAxios.get.mockResolvedValue({
      data: { data: true },
      status: HttpCode.OK,
    });
    const taskService: TaskServiceInterface = new TaskService();
    const result = await taskService.validateToken(token);
    expect(result).toBeTruthy();
  });

  it('should valdiate token expired', async () => {
    const token = 'token';
    jest.spyOn(Axios, 'get').mockResolvedValue({} as any);
    mockedAxios.get.mockResolvedValue({
      data: { data: false },
      status: HttpCode.OK,
    });
    const taskService: TaskServiceInterface = new TaskService();
    const result = await taskService.validateToken(token);
    expect(result).toBeFalsy();
  });

  it('should not valdiate token', async () => {
    const token = 'token';
    jest.spyOn(Axios, 'get').mockResolvedValue({} as any);
    mockedAxios.get.mockRejectedValue({});
    const taskService: TaskServiceInterface = new TaskService();
    const result = await taskService.validateToken(token);
    expect(result).toBeFalsy();
  });
});
