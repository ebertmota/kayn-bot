import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { setupRoutes } from './routes';
import { setupMiddlewares } from './middlewares';

export const app = express();

setupRoutes(app);
setupMiddlewares(app);
