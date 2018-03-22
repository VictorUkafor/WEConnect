import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import models from '../models';

const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];

const User = models.User;

export default class UsersController {

static postUser(req, res) {
  const { body: userInfo } = req;
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  
      User.create({
        firstName : userInfo.firstName, 
        lastName : userInfo.lastName,
        email : userInfo.email,
        password : hashedPassword
      })
      .then((user) => {
        const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 3600 });
        return res.status(201).send({user, auth: true, token: token})
      }).catch(error => { res.status(500).send("There was a problem registering the user.") });
    
  }

}

  