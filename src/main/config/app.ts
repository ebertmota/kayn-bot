import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';

export const app = express();

app.use(express.json());
