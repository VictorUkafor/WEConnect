import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, Business, Review, } from '../models';
import AuthController from '../controllers/middlewares';
import UsersController from '../controllers/users';
import BusinessesController from '../controllers/businesses';
import ReviewsController from '../controllers/reviews';
import dbConfig from '../config/config';

const config = dbConfig[process.env.NODE_ENV] || dbConfig.development;
const apiRouter = express.Router();
const usersController = new UsersController(User, bcrypt, jwt, config);
const businessesController = new BusinessesController(Business, Review);
const reviewsController = new ReviewsController(Review);
const authController = new AuthController(User, Business, Review, jwt, config);

apiRouter.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the WEConnect app!',
}));

apiRouter.post(
  '/auth/signup',
  authController.checksForRequiredUserFields,
  authController.checksIfUserExist,
  usersController.postUser
);

apiRouter.post(
  '/auth/login',
  usersController.loginUser
);

// apiRouter.get(
//   '/user',
//   AuthController.checksIfUserIsAuthenticated,
//   UsersController.getUserDetails
// );

// apiRouter.put(
//   '/user',
//   AuthController.checksIfUserIsAuthenticated,
//   UsersController.updateUserDetails
// );

apiRouter.post(
  '/businesses',
  authController.checksIfUserIsAuthenticated,
  authController.checksForRequiredBusinessFields,
  authController.checksIfBusinessAlreadyExist,
  businessesController.postBusiness
);

apiRouter.put(
  '/businesses/:businessId',
  authController.checksIfUserIsAuthenticated,
  authController.checksIfBusinessBelongsToUser,
  businessesController.updateBusiness
);

apiRouter.delete(
  '/businesses/:businessId',
  authController.checksIfUserIsAuthenticated,
  authController.checksIfBusinessBelongsToUser,
  businessesController.removeBusiness
);

apiRouter.get(
  '/businesses/:businessId',
  businessesController.getBusiness
);

apiRouter.get(
  '/businesses',
  businessesController.getAllBusinesses
);

apiRouter.post(
  '/businesses/:businessId/reviews',
  authController.checksIfUserIsAuthenticated,
  authController.checksIfBusinessExist,
  reviewsController.postReview
);

apiRouter.get(
  '/businesses/:businessId/reviews',
  authController.checksIfBusinessExist,
  reviewsController.getReviews
);

export default apiRouter;
