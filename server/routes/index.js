import express from 'express';
const apiRouter = express.Router();
import UsersController from '../controllers/users';
import AuthController from '../controllers/middlewares';


// route for signup api endpoint	
apiRouter.post('/auth/signup', 
AuthController.checksForRequiredFields, 
AuthController.checksIfUserExist, 
UsersController.postUser);


export default apiRouter;

