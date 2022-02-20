import './config/module-alias';
import 'reflect-metadata';
import { app } from './config/app';
import { env } from './config/env';

app.listen(env.port, () => {
  console.log(`\nServer started on port ${process.env.APP_PORT}!`);
});
