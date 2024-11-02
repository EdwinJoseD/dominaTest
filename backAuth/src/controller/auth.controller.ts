import { Request, Response, Router } from 'express';
import { handleResponse, HttpCode } from '../helpers';
import { UserInput } from '../models';
import { AuthDomain } from '../domain/auth.domain';
import { authValidator } from '../validator/auth.validator';
import { AuthDomainInterface } from '../domain/auth.domain.interface';

export const AuthController = Router();

AuthController.post(
  '/login',
  authValidator,
  async (req: Request, res: Response) => {
    const user: UserInput = req.body;
    const authDomain: AuthDomainInterface = new AuthDomain();
    const token = await authDomain.login(user);
    handleResponse(res, HttpCode.OK, token);
  }
);

AuthController.post(
  '/register',
  authValidator,
  async (req: Request, res: Response) => {
    const user: UserInput = req.body;
    const authDomain: AuthDomainInterface = new AuthDomain();
    const userCreated = await authDomain.register(user);
    handleResponse(res, HttpCode.CREATED, userCreated);
  }
);
