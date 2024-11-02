import { Request, Response, NextFunction } from 'express';

//*********************** helpers *****************************//
import { decodeToken, handleError, HttpCode } from '../helpers';

export enum MessageError {
  ERROR_TOKEN_AUTHORIZATION = "You don't have permissions for the request",
}

/**
 * Valida la existencia de un token de usuario valido
 * @param req Request de la petición
 * @param res Respuesta de la petición
 * @param next Funcion para dar continuidad con la aplicación
 */
export const verifytoken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers['authorization'];
  const token = bearerHeader ? bearerHeader.split(' ')[1] : null;
  if (token) {
    const decoded = decodeToken(token);
    req.body.userToken = token;
    req.body.user = decoded;

    next();
  } else {
    handleError(
      res,
      HttpCode.UNAUTHORIZED,
      MessageError.ERROR_TOKEN_AUTHORIZATION
    );
  }
};
