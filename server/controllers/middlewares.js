/**
 * @fileOverview this JS file contains logic for middleware's APIs logic
 *
 * @author  Victor Ukafor
 * @requires  NPM:jsonwebtoken
 * @version 1.0.0
 *
 */

/**
 * A class to represents middlewares controller
 * @class
 */
export default class AuthController {
  /**
   * @constructor
   * @param {object} User
   * @param {object} Business
   * @param {object} Review
   * @param {object} jwt
   * @param {object} config
   */
  constructor(User, Business, Review, jwt, config) {
    this.User = User;
    this.Business = Business;
    this.Review = Review;
    this.jwt = jwt;
    this.config = config;
    this.checksIfUserIsAuthenticated = this.checksIfUserIsAuthenticated.bind(this);
    this.checksForRequiredUserFields = this.checksForRequiredUserFields.bind(this);
    this.checksIfUserExist = this.checksIfUserExist.bind(this);
    this.checksIfBusinessAlreadyExist = this.checksIfBusinessAlreadyExist.bind(this);
    this.checksIfBusinessExist = this.checksIfBusinessExist.bind(this);
    this.checksIfBusinessBelongsToUser = this.checksIfBusinessBelongsToUser.bind(this);
    this.checksForRequiredBusinessFields = this.checksForRequiredBusinessFields.bind(this);
    this.userErrors = [];
    this.businessErrors = [];
    this.userFields = {
      firstName: 'The First Name field is required',
      lastName: 'The Last Name field is required',
      email: 'The Email field is required',
      password: 'The Password field is required',
    };
    this.businessFields = {
      businessName: 'The Business Name field is required',
      description: 'The Description field is required',
      categories: 'The Categories field is required',
      location: 'The Location field is required',
    };
  }

  /**
   * Takes req and res to return the user object
   * @param {object} req the request object
   * @param {object} res the response object
   * @param {object} next the next object
   * @returns {object} the user object
   */
  checksIfUserIsAuthenticated(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
      return res.status(401).send({
        authenticated: false, message: 'Token not found!'
      });
    }
    this.jwt.verify(token, this.config.secret, (err, authenticated) => {
      if (!authenticated) {
        return res.status(500).send({
          authenticated: false, message: 'You are not registered user!'
        });
      }
      this.User.findOne({
        where: { id: authenticated.id },
        include: [{ model: this.Business, as: 'businesses', }]
      }).then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User can not be found!' });
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
  checksForRequiredUserFields(req, res, next) {
    Object.keys(this.userFields).forEach((field) => {
      if (!req.body[field]) { this.userErrors.push(this.userFields[field]); }
    });

    if (this.userErrors.length > 0) {
      return res.status(400).send({ message: this.userErrors });
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
  checksIfUserExist(req, res, next) {
    this.User.findOne({ where: { email: req.body.email } }).then((user) => {
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
  checksIfBusinessAlreadyExist(req, res, next) {
    this.Business.findOne({ where: { businessName: req.body.businessName } }).then((business) => {
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
  checksIfBusinessExist(req, res, next) {
    const businessId = parseInt(req.params.businessId, 10);

    this.Business.findOne({
      where: { id: businessId },
      include: [{ model: this.Review, as: 'reviews', }],
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
  checksIfBusinessBelongsToUser(req, res, next) {
    const businessId = parseInt(req.params.businessId, 10);

    this.Business.findOne({
      where: { id: businessId },
      include: [{ model: this.Review, as: 'reviews', }]
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
  checksForRequiredBusinessFields(req, res, next) {
    Object.keys(this.businessFields).forEach((field) => {
      if (!req.body[field]) { this.businessErrors.push(this.businessFields[field]); }
    });

    if (this.businessErrors.length > 0) {
      res.status(400).send({ message: this.businessErrors });
    }
    next();
  }
}
