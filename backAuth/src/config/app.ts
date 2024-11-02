import environment from 'dotenv-flow';
environment.config({
    silent: true,
});
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-errors';
import { HandlerException } from '../helpers/handlerException/handlerException';
import { AuthRoutes } from '../routes';

const { PREFIX }: any = process.env.PREFIX || '/back-auth';
const app: Application = express();

app.use(HandlerException);
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev', {
    skip: function (req, res) { return res.statusCode < 400 }
}));
app.enable('trust proxy');
app.get(`${PREFIX}/ping`, (req, res) => {
    res.json({
        success: true,
        message: 'Microservice is running',
        date: new Date()
    })
});
const apiPrefix = `${PREFIX}/api`;
app.use(`${apiPrefix}/auth`, AuthRoutes);

export default app;