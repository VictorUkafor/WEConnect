import express from 'express';
import UsersController from '../controllers/users';

const router = express.Router();
const usersController = new UsersController();

  router.get('/api/v1', (req, res) => res.status(200).send({ message: 'Welcome to the WEConnect app!' }));
  router.post('/auth/signup', usersController.this(postUser));

  export default router;
