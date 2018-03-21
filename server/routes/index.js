import express from 'express';
const apiRouter = express.Router();
import UsersController from '../controllers/users';

	
apiRouter.post('/auth/signup', UsersController.postUser);

export default apiRouter;

