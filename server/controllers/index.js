
/**
  *  class AllController
  *
  */
export default class AllController {
/**
  *  constructor
  *  Takes one parameter
  *  @param {object} router the first parameter
  *
  */
  constructor(router) {
    this.router = router;
    this.registerRoutes();
    this.users = [];
  }

  /**
  *  contains routes for all APIs
  *  @returns {object} return an object
  *
  */
  registerRoutes() {
    this.router.post('/auth/signup', this.postUser.bind(this));
  }

  /** An API for adding a new user:
  *  POST: /auth/signup
  *  Takes 2 parameters
  *  @param {object} req the first parameter
  *  @param  {object} res the second parameter
  *
  *  @returns {object} return an object
  */
  postUser(req, res) {
    const { body: userInfo } = req;
    const errors = [];
    const reqEmail = this.users.find(u => u.email === userInfo.email);

    let id = '';
    if (this.users.length === 0) {
      id = 1;
    } else {
      id = this.users[this.users.length - 1].id + 1;
    }

    const userFields = {
      firstName: 'The First Name field is required',
      lastName: 'The Last Name field is required',
      email: 'The Email field is required',
      password: 'The Password field is required',
      confirm_password: 'The Confirm_Password field is required'
    };

    if (!Object.keys(userInfo).length > 0) {
      res.status(500).send({
        message: 'All fields are required!'
      });
    } else {
      Object.keys(userFields).forEach((field) => {
        if (!userInfo[field]) { errors.push(userFields[field]); }
      });

      if (errors.length > 0) {
        res.status(500).send({ message: errors });
      } else if (userInfo.password !== userInfo.confirm_password) {
        res.status(500).send({ message: 'Your password did not match!' });
      } else if (reqEmail) {
        res.status(500).send({ message: 'The user with this email has already been registered!' });
      } else {
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

