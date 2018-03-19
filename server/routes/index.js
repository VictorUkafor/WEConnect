import express from 'express';
import UsersController from '../controllers/users';

const apiRouter = express.Router();
const usersController = new UsersController(apiRouter);

export default (app) => {
  app.get('/api/v1', (req, res) => res.status(200).send({ message: 'Welcome to the WEConnect app!' }));
  app.use('/api/v1', apiRouter);
};
