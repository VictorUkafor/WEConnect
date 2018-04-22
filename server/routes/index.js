import express from 'express';
import AuthController from '../controllers/middlewares';
import UsersController from '../controllers/users';
import BusinessesController from '../controllers/businesses';

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the WEConnect app!',
}));

apiRouter.post(
    '/auth/signup',
    AuthController.checksForRequiredFields,
    AuthController.checksIfUserExist,
    UsersController.postUser
  );
  
  apiRouter.post(
    '/auth/login',
    UsersController.loginUser
  );
  
  apiRouter.post(
    '/businesses',
    AuthController.checksIfUserIsAuthenticated,
    AuthController.requiredBusinessFields,
    AuthController.checksIfBusinessAlreadyExist,
    BusinessesController.postBusiness
  );
  
  apiRouter.put(
    '/businesses/:businessId',
    AuthController.checksIfUserIsAuthenticated,
    AuthController.checksIfBusinessBelongsToUser,
    BusinessesController.updateBusiness
  );
  
  apiRouter.delete(
    '/businesses/:businessId',
    AuthController.checksIfUserIsAuthenticated,
    AuthController.checksIfBusinessBelongsToUser,
    BusinessesController.removeBusiness
  );
  
  apiRouter.get(
    '/businesses/:businessId',
    BusinessesController.getBusiness
  );
  
  apiRouter.get(
    '/businesses',
    BusinessesController.getAllBusinesses
  );
  
  // apiRouter.post(
  //   '/businesses/:businessId/reviews',
  //   AuthController.checksIfUserIsAuthenticated,
  //   AuthController.checksIfBusinessExist,
  //   ReviewsController.postReview
  // );
  
  // apiRouter.get(
  //   '/businesses/:businessId/reviews',
  //   AuthController.checksIfBusinessExist,
  //   ReviewsController.getReviews
  // );

export default apiRouter;
