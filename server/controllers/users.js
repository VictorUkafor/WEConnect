import bcrypt from 'bcryptjs';
import models from '../models';
const User = models.User;


export default {
  allUsers(req, res){
    return User
    .findAll({})
    .then(users => res.status(200).send(users))
    .catch(error => res.status(400).send(error));
},

create(req, res) {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);   
  return User
    .create({
      firstName : req.body.firstName, 
      lastName : req.body.lastName,
      email : req.body.email,
      password : hashedPassword
    })
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send(error));
},

};
  