import { Types } from 'mongoose';

/**
 * User type
 * @typedef {Object} Task
 * @property {string} _id - The id
 * @property {string} userId - The user id
 * @property {string} title - The title
 * @property {string} description - The description
 * @property {boolean} completed - The completed status
 */
export type Task = {
  _id: Types.ObjectId;
  userId?: string;
  title?: string;
  description?: string;
  completed?: boolean;
};

/**
 * User input type
 * @typedef {Object} TaskInput
 * @property {string} title - The title
 * @property {string} description - The description
 * @property {boolean} completed - The completed status
 */
export type TaskInput = Omit<Task, '_id'>;
