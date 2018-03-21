import bcrypt from 'bcryptjs';
import models from '../models';
const User = models.User;


export default class UsersController {

static postUser(req, res) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  const { body: userInfo } = req;
  
      return User.create({
        firstName : userInfo.firstName, 
        lastName : userInfo.lastName,
        email : userInfo.email,
        password : hashedPassword
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error))
    
  }

}

  