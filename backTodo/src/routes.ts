import express from 'express';
import { TaskController } from './controller/task.controller';
import { verifytoken } from './middleware/verifyToken.middleware';

export const TaskRoutes = express.Router();

TaskRoutes.use(verifytoken, TaskController);
