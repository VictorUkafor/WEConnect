import express from 'express';
const apiRouter = express.Router();
import UsersController from '../controllers/users';
import AuthController from '../controllers/middlewares';


// route for signup api endpoint	
apiRouter.post('/auth/signup', 
AuthController.checksIfUserExist,
AuthController.checksForRequiredFields, 
UsersController.postUser);


export default apiRouter;

