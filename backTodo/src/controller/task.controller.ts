import { Request, Response, Router } from 'express';
import { handleResponse, HttpCode } from '../helpers';
import { Task, TaskInput } from '../models';
import { TaskDomain, TaskDomainInterface } from '../domain';
import { taskValidator } from '../validator/task.validator';

export const TaskController = Router();

/**
 * Request Body
 * @typedef {object} TaskInputType
 * @property {string} title.required - Task title
 * @property {string} description.required - Task description
 * @property {boolean} completed - Task completed
 */
/**
 * Success Response
 * @typedef {object} SuccessResponse
 * @property {number} status.required - Status code
 * @property {Task} data.required - Task data
 */
/**
 * Error Response
 * @typedef {object} ErrorResponse
 * @property {number} status.required - Status code
 * @property {string} message.required - Error message
 */
/**
 * POST /back-todo/api/task
 * @tags Task
 * @summary create a new task
 * @description create a new task
 * @security BearerAuth
 * @param {TaskInputType} request.body.required - Task input
 * @return {SuccessResponse} 201 - Success response
 * @return {ErrorResponse} 400 - Error de negocio
 * @return {ServerError} 500 - Error de servidor
 */
TaskController.post(
  '/task',
  taskValidator,
  async (req: Request, res: Response) => {
    const taskInput: TaskInput = req.body;
    const { userId } = req.body;
    console.log('userId', userId);
    const taskDomain: TaskDomainInterface = new TaskDomain();
    const task: Task = await taskDomain.createTask(taskInput, userId);
    handleResponse(res, HttpCode.CREATED, task);
  }
);

/**
 * Success Response
 * @typedef {object} SuccessResponse
 * @property {number} status.required - Status code
 * @property {Task[]} data.required - Task data
 */
/**
 * Error Response
 * @typedef {object} ErrorResponse
 * @property {number} status.required - Status code
 * @property {string} message.required - Error message
 */
/**
 * GET /back-todo/api/task
 * @tags Task
 * @summary get all tasks
 * @description get all tasks
 * @security BearerAuth
 * @return {SuccessResponse} 200 - Success response
 * @return {ErrorResponse} 400 - Error de negocio
 * @return {ServerError} 500 - Error de servidor
 */
TaskController.get('/task', async (req: Request, res: Response) => {
  const { userId } = req.body;
  const taskDomain: TaskDomainInterface = new TaskDomain();
  const tasks: Task[] = await taskDomain.getAllTasks(userId);
  handleResponse(res, HttpCode.OK, tasks);
});

/**
 * Success Response
 * @typedef {object} SuccessResponse
 * @property {number} status.required - Status code
 * @property {Task} data.required - Task data
 */
/**
 * Error Response
 * @typedef {object} ErrorResponse
 * @property {number} status.required - Status code
 * @property {string} message.required - Error message
 */
/**
 * GET /back-todo/api/task/{id}
 * @tags Task
 * @summary get a task by id
 * @description get a task by id
 * @security BearerAuth
 * @param {string} id.path.required - task id
 * @return {SuccessResponse} 200 - Success response
 * @return {ErrorResponse} 400 - Error de negocio
 * @return {ServerError} 500 - Error de servidor
 */
TaskController.get('/task/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const taskDomain: TaskDomainInterface = new TaskDomain();
  const task: Task | null = await taskDomain.getTaskById(id);
  handleResponse(res, HttpCode.OK, task);
});

/**
 * Success Response
 * @typedef {object} SuccessResponse
 * @property {number} status.required - Status code
 * @property {boolean} data.required - Task data
 */
/**
 * Error Response
 * @typedef {object} ErrorResponse
 * @property {number} status.required - Status code
 * @property {string} message.required - Error message
 */
/**
 * PUT /back-todo/api/task/{id}
 * @tags Task
 * @summary update a task by id
 * @description update a task by id
 * @security BearerAuth
 * @param {string} id.path.required - task id
 * @param {TaskInputType} request.body.required - Task input
 * @return {SuccessResponse} 200 - Success response
 * @return {ErrorResponse} 400 - Error de negocio
 * @return {ServerError} 500 - Error de servidor
 */
TaskController.put('/task/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const taskInput: TaskInput = req.body;
  const { userId } = req.body;
  const taskDomain: TaskDomainInterface = new TaskDomain();
  const task: boolean = await taskDomain.updateTask(id, taskInput, userId);
  handleResponse(res, HttpCode.OK, task);
});

/**
 * Success Response
 * @typedef {object} SuccessResponse
 * @property {number} status.required - Status code
 * @property {boolean} data.required - Task data
 */
/**
 * Error Response
 * @typedef {object} ErrorResponse
 * @property {number} status.required - Status code
 * @property {string} message.required - Error message
 */
/**
 * DELETE /back-todo/api/task/{id}
 * @tags Task
 * @summary delete a task by id
 * @description delete a task by id
 * @security BearerAuth
 * @param {string} id.path.required - task id
 * @return {SuccessResponse} 200 - Success response
 * @return {ErrorResponse} 400 - Error de negocio
 * @return {ServerError} 500 - Error de servidor
 */
TaskController.delete('/task/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const taskDomain: TaskDomainInterface = new TaskDomain();
  const task: boolean = await taskDomain.deleteTask(id);
  handleResponse(res, HttpCode.OK, task);
});
