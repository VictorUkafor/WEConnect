/**
 * @fileOverview this JS file contains logic for middleware's APIs logic
 *
 * @author  Victor Ukafor
 * @requires  NPM:jsonwebtoken
 * @version 1.0.0
 *
 */


import jwt from 'jsonwebtoken';
import app from '../../index';
import { User, Business, Review } from '../models';

/**
 * A class to represents middlewares controller
 * @class
 */
export default class AuthController {
  /**
   * Takes req and res to return the user object
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next object
   * @returns {object} the user object
   */
  static checksIfUserIsAuthenticated(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
      return res.status(401).send({
        authenticated: false, message: 'Token not found!'
      });
    }
    jwt.verify(token, app.get('lockAndKeys'), (err, authenticated) => {
      if (!authenticated) {
        return res.status(500).send({
          authenticated: false, message: 'You are not registered user!'
        });
      }
      User.findOne({
        where: { id: authenticated.id },
        include: [{ model: Business, as: 'businesses', }]
      }).then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User can not be found!'
          });
        }
        req.user = user;
        next();
      });
    });
  }

  /**
   * Takes req and res to return the business object
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next object
   * @returns {object} the business object
   */
  static checksForRequiredFields(req, res, next) {
    const { body: userInfo } = req;
    const errors = [];

    const requiredFields = {
      firstName: 'The First Name field is required',
      lastName: 'The Last Name field is required',
      email: 'The Email field is required',
      password: 'The Password field is required',
    };

    Object.keys(requiredFields).forEach((field) => {
      if (!userInfo[field]) { errors.push(requiredFields[field]); }
    });

    if (!Object.keys(userInfo).length > 0) {
      return res.status(400).send({
        message: 'All fields are required!'
      });
    } else if (errors.length > 0) {
      return res.status(400).send({
        message: errors
      });
    }
    next();
  }

  /**
   * Takes req and res to return the user object
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next object
   * @returns {object} the user object
   */
  static checksIfUserExist(req, res, next) {
    User.findOne({ where: { email: req.body.email } }).then((user) => {
      if (user) {
        return res.status(400).send({
          message: 'An account has already been created with this email'
        });
      }
    });
    next();
  }

  /**
   * Takes req and res to return the business object
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next object
   * @returns {object} the business object
   */
  static checksIfBusinessAlreadyExist(req, res, next) {
    Business.findOne({ where: { businessName: req.body.businessName } }).then((business) => {
      if (business) {
        return res.status(400).send({
          message: 'A business with this name has been registered already'
        });
      }
      next();
    });
  }

  /**
   * Takes req and res to return the business object
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next object
   * @returns {object} the business object
   */
  static checksIfBusinessExist(req, res, next) {
    const businessId = parseInt(req.params.businessId, 10);

    Business.findOne({
      where: { id: businessId },
      include: [{ model: Review, as: 'reviews', }],
    }).then((business) => {
      if (!business) {
        return res.status(404).send({
          message: 'Business can not be found!'
        });
      }
      req.business = business;
      next();
    });
  }

  /**
   * Takes req and res to return the business object
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next object
   * @returns {object} the business object
   */
  static checksIfBusinessBelongsToUser(req, res, next) {
    const businessId = parseInt(req.params.businessId, 10);

    Business.findOne({
      where: { id: businessId },
      include: [{ model: Review, as: 'reviews', }]
    }).then((business) => {
      if (!business) {
        return res.status(404).send({
          message: 'This business does not exist!'
        });
      } else if (business && business.userId !== req.user.id) {
        return res.status(404).send({
          message: 'This business does not belong to you!'
        });
      }
      req.business = business;
      next();
    });
  }

  /**
   * Takes req and res to return the business object
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next object
   * @returns {object} the business object
   */
  static requiredBusinessFields(req, res, next) {
    const { body: businessInfo } = req;
    const errors = [];

    const requiredFields = {
      businessName: 'The Name of the Business is required',
      description: 'The Business description is required',
      location: 'The Location field is required',
      categories: 'You must select atleast one category',
    };

    Object.keys(requiredFields).forEach((field) => {
      if (!businessInfo[field]) { errors.push(requiredFields[field]); }
    });

    if (!Object.keys(businessInfo).length > 0) {
      return res.status(400).send({
        message: 'All fields are required!'
      });
    } else if (errors.length > 0) {
      res.status(400).send({ message: errors });
    }
    next();
  }
}
