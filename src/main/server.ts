import './config/module-alias';
import 'reflect-metadata';
import { app } from './config';

app.listen(process.env.APP_PORT, () => {
  console.log(`\nServer started on port ${process.env.APP_PORT}!`);
});
