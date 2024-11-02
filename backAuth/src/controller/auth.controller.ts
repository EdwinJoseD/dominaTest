import { Request, Response, Router } from 'express';
import { handleResponse, HttpCode } from '../helpers';
import { User, UserInput } from '../models';
import { AuthDomain, AuthDomainInterface } from '../domain';
import { authValidator } from '../validator/auth.validator';
import { verifytoken } from '../middleware/verifyToken.middleware';

export const AuthController = Router();

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

AuthController.get('/me', verifytoken, async (req: Request, res: Response) => {
  const { userToken } = req.body;
  const authDomain: AuthDomainInterface = new AuthDomain();
  const user: User = await authDomain.me(userToken);
  handleResponse(res, HttpCode.OK, user);
});

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
