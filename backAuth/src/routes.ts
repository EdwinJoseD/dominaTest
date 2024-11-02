import express from 'express';
import { AuthController } from './controller/auth.controller';

export const AuthRoutes = express.Router();

AuthRoutes.use(AuthController)