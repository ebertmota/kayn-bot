import { Router } from 'express';

export default (router: Router): void => {
  router.post('/', (req, res) => {
    res.send({ oi: 'oi' });
  });
};
