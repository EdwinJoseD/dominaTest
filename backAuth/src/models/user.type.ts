import { Types } from 'mongoose';

/**
 * User type
 * @typedef {Object} User
 * @property {string} _id
 * @property {string} email
 * @property {string} password
 */
export type User  = {
    _id: Types.ObjectId;
    email: string;
    password: string;
}

/**
 * User input type
 * @typedef {Object} UserInput
 * @property {string} email
 * @property {string} password
 */
export type UserInput = Omit<User, '_id'>;