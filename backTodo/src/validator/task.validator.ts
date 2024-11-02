import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { handleValidator } from '../helpers';

/**
 * Valida los datos ingresados en el body de una petición
 * @param req Request de la petición
 * @param res Respuesta de la petición
 * @param next Funcion para dar continuidad con la aplicación
 */
export const taskValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  (req: Request, res: Response, next: NextFunction) => {
    handleValidator(req, res, next);
  },
];
