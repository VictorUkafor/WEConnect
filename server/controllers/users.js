import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models';
import app from '../../index';


export default class UsersController {
  static postUser(req, res) {
    const { body: userInfo } = req;
    const salt = bcrypt.genSaltSync(10);
    User.create({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      password: bcrypt.hashSync(userInfo.password, salt),
    }).then((user) => {
      const token = jwt.sign({ id: user.id }, app.get('lockAndKeys'), { expiresIn: 60 * 60 });
      return res.status(201).send({ user, authenticated: true, token });
    }).catch(() => { res.status(500); });
  }


  static loginUser(req, res) {
    const { body: userInfo } = req;

    if (userInfo.email && userInfo.password) {
      User.findOne({ where: { email: userInfo.email } }).then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'Invalid email or password!' });
        } else if (!bcrypt.compareSync(userInfo.password, user.password)) {
          return res.status(404).send({ message: 'Invalid email or password!' });
        } else if (user) {
          const token = jwt.sign({ id: user.id }, app.get('lockAndKeys'), { expiresIn: 60 * 60 });

          return res.status(200).send({
            message: `Welcome! ${user.firstName} ${user.lastName}`,
            authenticated: true,
            token
          });
        }
      });
    } else {
      return res.status(400).send({ message: 'Both fields must be filled' });
    }
  }
}

