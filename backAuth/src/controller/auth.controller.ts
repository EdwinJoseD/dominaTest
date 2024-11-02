import { Request, Response, Router } from 'express';
import { handleResponse, HttpCode } from '../helpers';
import { User, UserInput } from '../models';
import { AuthDomain, AuthDomainInterface } from '../domain';
import { authValidator } from '../validator/auth.validator';
import { verifytoken } from '../middleware/verifyToken.middleware';

export const AuthController = Router();

/**
 * User input type
 * @typedef {object} UserInputType
 * @property {string} email.required - email
 * @property {string} password.required - password
 */
/**
 * Success Response
 * @typedef {object} SuccessResponse
 * @property {number} status.required - Status code
 * @property {string} data.required - Task data
 */
/**
 * Error Response
 * @typedef {object} ErrorResponse
 * @property {number} status.required - Status code
 * @property {string} message.required - Error message
 */
/**
 * POST /back-auth/api/auth/login
 * @tags Auth
 * @summary generate a token
 * @description generate a token
 * @param {UserInputType} request.body.required - user
 * @return {SuccessResponse} 201 - Success response
 * @return {ErrorResponse} 400 - Error de negocio
 * @return {ServerError} 500 - Error de servidor
 */
AuthController.post(
  '/login',
  authValidator,
  async (req: Request, res: Response) => {
    const user: UserInput = req.body;
    const authDomain: AuthDomainInterface = new AuthDomain();
    const token: string = await authDomain.login(user);
    handleResponse(res, HttpCode.OK, token);
  }
);

/**
 * Success Response
 * @typedef {object} SuccessResponse
 * @property {number} status.required - Status code
 * @property {string} data.required - Task data
 */
/**
 * Error Response
 * @typedef {object} ErrorResponse
 * @property {number} status.required - Status code
 * @property {string} message.required - Error message
 */
/**
 * POST /back-auth/api/auth/register
 * @tags Auth
 * @summary create a new user
 * @description create a new user
 * @param {UserInputType} request.body.required - email
 * @return {SuccessResponse} 201 - Success response
 * @return {ErrorResponse} 400 - Error de negocio
 * @return {ServerError} 500 - Error de servidor
 */
AuthController.post(
  '/register',
  authValidator,
  async (req: Request, res: Response) => {
    const user: UserInput = req.body;
    const authDomain: AuthDomainInterface = new AuthDomain();
    const userCreated: User = await authDomain.register(user);
    handleResponse(res, HttpCode.CREATED, userCreated);
  }
);

/**
 * Success Response
 * @typedef {object} SuccessResponse
 * @property {number} status.required - Status code
 * @property {User} data.required - Task data
 */
/**
 * Error Response
 * @typedef {object} ErrorResponse
 * @property {number} status.required - Status code
 * @property {string} message.required - Error message
 * */
/**
 * GET /back-auth/api/auth/me
 * @tags Auth
 * @summary get user data
 * @description get user data
 * @return {SuccessResponse} 200 - Success response
 * @return {ErrorResponse} 400 - Error de negocio
 * @return {ServerError} 500 - Error de servidor
 * @security BearerAuth
 */
AuthController.get('/me', verifytoken, async (req: Request, res: Response) => {
  const { userToken } = req.body;
  const authDomain: AuthDomainInterface = new AuthDomain();
  const user: User = await authDomain.me(userToken);
  handleResponse(res, HttpCode.OK, user);
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
 * */
/**
 * GET /back-auth/api/auth/verify
 * @tags Auth
 * @summary verify token
 * @description verify token
 * @return {SuccessResponse} 200 - Success response
 * @return {ErrorResponse} 400 - Error de negocio
 * @return {ServerError} 500 - Error de servidor
 * @security BearerAuth
 */
AuthController.get(
  '/verify',
  verifytoken,
  async (req: Request, res: Response) => {
    const { userToken } = req.body;
    const token = req.headers.authorization;
    const authDomain: AuthDomainInterface = new AuthDomain();
    const verify: boolean = await authDomain.verifyToken(userToken);
    handleResponse(res, HttpCode.OK, verify);
  }
);
