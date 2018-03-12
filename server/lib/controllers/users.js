import uuid from 'uuid';
import database from '../db/database';
import UsersService from '../services/users';

const usersService = new UsersService(database);


export default class UsersController {
  constructor(router) {
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post('/auth/signup', this.postUser.bind(this));
  }

  postUser(req, res) {
    const userInfo = req.body;
    const errors = [];
    const users = usersService.getUsers();
    const reqEmail = users.find(u => u.email === userInfo.email);
    const userFields = {
      firstName: 'The firstName field is required',
      lastName: 'The lastName field is required',
      email: 'The email field is required',
      password: 'The password field is required',
      confirm_password: 'The confirm_password field is required'
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
        const id = uuid.v4();
        const firstName = userInfo.firstName;
        const lastName = userInfo.lastName;
        const email = userInfo.email;
        const password = userInfo.password;
        const user = {
          id, firstName, lastName, email, password,
        };

        usersService.addUser(user);
        return res.status(201).send({
          message: ['A new user has been added successfully', users.reverse()]
        });
      }
    }
  }
}

