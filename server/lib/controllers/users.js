import uuid from 'uuid';
import database from '../db/database';
import UsersService from '../services/users';

const usersService = new UsersService();


export default class UsersController {
  constructor(router) {
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post('/auth/signup', this.postUser.bind(this));
    this.router.post('/auth/login', this.loginUser.bind(this));
  }

  postUser(req, res) {
    const userInfo = req.body;
    const errors = [];
    const users = usersService.getUsers();
    const reqEmail = users.find(u => u.email === userInfo.email);
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


  loginUser(req, res){
    const userInfo = req.body;
    const users = usersService.getUsers();
    const validate = users.find(user => user.email === userInfo.email);

    if(Object.keys(userInfo).length !== 2) {
      res.status(500).send({ message: 'All fields are required!' });
    } else {

      if(validate && validate.password === userInfo.password){
        res.status(200).send({ message: 'Welcome! ' + validate.firstName + ' ' + validate.lastName });
      }else{
        res.status(404).send({ message: 'Invalid email or password!' });
      }
    
}

}

}





