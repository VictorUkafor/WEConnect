import express from 'express';

const apiRouter = express.Router();
import UsersController from '../controllers/users';

const usersController = new UsersController(apiRouter);

export default (app) => {
  app.get('/api/v1', (req, res) => res.status(200).send({ message: 'Welcome to the WEConnect routes!' }));
  app.use('/api/v1', apiRouter);
};
