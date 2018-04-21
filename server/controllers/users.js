
import uuid from 'uuid';
const users = [];

export default class UsersController {

  static postUser(req, res) {
    const { body: userInfo } = req;
    const errors = [];
    const regUser = users.find(u => u.email === userInfo.email);

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
      } else if (regUser) {
        res.status(500).send({ message: 'The user with this email has already been registered!' });
      } else {
        const id = uuid.v4();
        const { firstName } = userInfo;
        const { lastName } = userInfo;
        const { email } = userInfo;
        const { password } = userInfo;
        const user = {
          id, firstName, lastName, email, password,
        };

        users.push(user);
        return res.status(201).send({
          message: ['A new user has been added successfully', user]
        });
      }
    }
  }

  static loginUser(req, res) {
    const { body: userInfo } = req;
    const validate = users.find(user => user.email === userInfo.email);

    if (Object.keys(userInfo).length !== 2) {
      res.status(500).send({ message: 'All fields are required!' });
    } else if (validate && validate.password === userInfo.password) {
      res.status(201).send({ message: `Welcome! ${validate.firstName} ${validate.lastName}` });
    } else {
      res.status(404).send({ message: 'Invalid email or password!' });
    }
  }
}

