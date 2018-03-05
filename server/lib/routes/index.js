import UsersController from '../controllers/usersController';

import database from '../db/database';

const usersController = new UsersController(database);

export default (app) => {
  app.get('/api/v1', (req, res) => res.status(200).send({ message: 'Welcome to the WEConnect routes!' }));
  app.post('/api/v1/auth/signup', usersController.postUsers);
};
