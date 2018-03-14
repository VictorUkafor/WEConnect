import uuid from 'uuid';
import Service from '../services/index';

const service = new Service();


export default class AllController {
  constructor(router) {
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.post('/auth/signup', this.postUser.bind(this));
    this.router.post('/auth/login', this.loginUser.bind(this));
    this.router.post('/:userId/businesses', this.postBusiness.bind(this));
  }

  postUser(req, res) {
    const userInfo = req.body;
    const errors = [];
    const users = service.getUsers();
    const reqEmail = users.find(u => u.email === userInfo.email);

    let id = '';
    if(users.length === 0){ 
      id = 1; }
      else{
          id = users[0].id + 1;
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

        const firstName = userInfo.firstName;
        const lastName = userInfo.lastName;
        const email = userInfo.email;
        const password = userInfo.password;
        const user = {
          id, firstName, lastName, email, password,
        };

        service.addUser(user);
        return res.status(201).send({
          message: ['A new user has been added successfully', users.reverse()]
        });
      }
    }
  }


  loginUser(req, res){
    const userInfo = req.body;
    const users = service.getUsers();
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


  postBusiness(req, res) {
    const businessInfo = req.body;
    const errors = [];
    const users = service.getUsers();
    const businesses = service.getBusinesses();
    const userId = parseInt(req.params.userId, 10);
    const user = users.find(user => user.id === userId);

    let id = '';
    if(businesses.length === 0){ 
      id = 1; }
      else{
          id = businesses[0].id + 1;
        }
    
    if(!user){
      res.status(500).send({ 
        message: 'Only registered users can add a business!'
         });
    }else{
        const businessFields = {
      businessName: 'The Name of the Business is required',
      description: 'The Business description is required',
      location: 'The Location field is required',
      categories: 'You must select atleast one category',
    };

    if (!Object.keys(businessInfo).length > 0) {
      res.status(500).send({
        message: 'Please fill in the required fields!'
      });
    } else {
      Object.keys(businessFields).forEach((field) => {
        if (!businessInfo[field]) { errors.push(businessFields[field]); }
      });

      if (errors.length > 0) {
        res.status(500).send({ message: errors });
      } else {

        const businessName = businessInfo.businessName;
        const description = businessInfo.description;
        const categories = businessInfo.categories;
        const productsOrServices = businessInfo.productsOrServices;
        const location = businessInfo.location;
        const address = businessInfo.address;
        const business = {
          id, userId, businessName, description, categories, 
          productsOrServices, location, address
        };

        service.addBusiness(business);
        return res.status(201).send({
          message: ['A new business has been added successfully', businesses.reverse()]
        });
      }
    }
  }
}

}





