
import uuid from 'uuid';
/**
  *  class AllController
  *
  */
export default class UsersController {

  constructor() {
    this.users = [];
  }

  /** An API for adding a new user:
  *  POST: /auth/signup
  *  Takes 2 parameters
  *  @param {object} req the first parameter
  *  @param  {object} res the second parameter
  *
  *  @returns {object} return an object
  */
  static postUser(req, res) {
    const userInfo = req.body;
    const errors = [];
    const reqEmail = this.users.find(u => u.email === userInfo.email);

    const userFields = {
      firstName: 'The First Name field is required',
      lastName: 'The Last Name field is required',
      email: 'The Email field is required',
      password: 'The Password field is required',
      confirm_password: 'The Confirm_Password field is required'
    };

    if (!Object.keys(userInfo).length > 0) {
      res.status(412).send({
        message: 'All fields are required!'
      });
    } else {
      Object.keys(userFields).forEach((field) => {
        if (!userInfo[field]) { errors.push(userFields[field]); }
      });

      if (errors.length > 0) {
        res.status(412).send({ message: errors });
      } else if (reqEmail) {
        res.status(403).send({ message: 'The user with this email has already been registered!' });
      } else {
        const id = uuid.v4();
        const { firstName } = userInfo;
        const { lastName } = userInfo;
        const { email } = userInfo;
        const { password } = userInfo;
        const user = {
          id, firstName, lastName, email, password,
        };

        this.users.push(user);
        return res.status(201).send({
          message: ['A new user has been added successfully', this.users]
        });
      }
    }
  }
}

