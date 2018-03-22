import bcrypt from 'bcryptjs';
import models from '../models';
const User = models.User;


export default class AuthController {

  static checksForRequiredFields(req, res, next) {
    const { body:userInfo } = req;
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
      res.status(405).send({message: 'All fields are required!'});
    } else if (errors.length > 0) {
      res.status(405).send({ message: errors });
    }
  
    next(); 
    }

  static checksIfUserExist(req, res, next) {
    const { body: userInfo } = req;
    
    User.findOne({ where: {email: userInfo.email} }).then(user => {
      if(user){
        res.status(406).send({message: "An account has already been created with this email"});
      }
    })
    
    next(); 
  }


}

  