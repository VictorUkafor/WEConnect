import express from 'express';
import AllController from '../controllers/index';

const apiRouter = express.Router();
const allController = new AllController(apiRouter);

export default (app) => {
  app.get('/api/v1', (req, res) => res.status(200).send({ message: 'Welcome to the WEConnect app!' }));
  app.use('/api/v1', apiRouter);
};
