import { Request, Response, NextFunction } from 'express';

//*********************** helpers *****************************//
import { handleError, HttpCode } from '../helpers';
import { TaskService } from '../service/task.service';
import { decodeToken } from '../helpers';

export enum MessageError {
  ERROR_TOKEN_AUTHORIZATION = "You don't have permissions for the request",
}

/**
 * Valida la existencia de un token de usuario valido
 * @param req Request de la petición
 * @param res Respuesta de la petición
 * @param next Funcion para dar continuidad con la aplicación
 */
export const verifytoken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskService = new TaskService();
  const bearerHeader = req.headers['authorization'];
  const token = bearerHeader ? bearerHeader.split(' ')[1] : null;
  if (token) {
    const decodedToken: any = decodeToken(token);
    req.body.userToken = token;
    req.body.userId = decodedToken._id;

    const validate = /*await taskService.validateToken(token);*/ true;
    if (!validate) {
      handleError(
        res,
        HttpCode.UNAUTHORIZED,
        MessageError.ERROR_TOKEN_AUTHORIZATION
      );
    }
    next();
  } else {
    handleError(
      res,
      HttpCode.UNAUTHORIZED,
      MessageError.ERROR_TOKEN_AUTHORIZATION
    );
  }
};
