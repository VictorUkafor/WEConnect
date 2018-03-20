import express from 'express';
import UsersController from '../controllers/users';

const router = express.Router();
const usersController = new UsersController();

router.get('/', (req, res) => res.status(200).send({ message: 'Welcome to the WEConnect app!' }));
router.post('/auth/signup', UsersController.postUser(req, res));

export default router;
