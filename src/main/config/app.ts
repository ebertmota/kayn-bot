import express from 'express';
import { setupListeners } from './listeners';
import { setupMiddlewares } from './middlewares';

export const app = express();

setupMiddlewares(app);
setupListeners();
