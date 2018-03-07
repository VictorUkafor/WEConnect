import uuid from 'uuid';

export default class AllController {
  constructor(router) {
    this.router = router;
    this.registerRoutes();
    this.users = [];
    this.businesses = [];
  }

  registerRoutes() {
    this.router.post('/auth/signup', this.postUser.bind(this));
    this.router.post('/auth/login', this.loginUser.bind(this));
    this.router.post('/:userId/businesses', this.postBusiness.bind(this));
    this.router.put('/:userId/businesses/:businessId', this.updateBusiness.bind(this));
  }

  postUser(req, res) {
    const userInfo = req.body;
    const errors = [];
    //const users = service.getUsers();
    const reqEmail = this.users.find(u => u.email === userInfo.email);

    let id = '';
    if(this.users.length === 0){ 
      id = 1; }
      else{
          id = this.users[0].id + 1;
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
        
        this.users.push(user);
        return res.status(201).send({
          message: ['A new user has been added successfully', this.users.reverse()]
        });
      }
    }
  }


  loginUser(req, res){
    const userInfo = req.body;
    const validate = this.users.find(user => user.email === userInfo.email);

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
    const userId = parseInt(req.params.userId, 10);
    const user = this.users.find(user => user.id === userId);

    let id = '';
    if(this.businesses.length === 0){ 
      id = 1; }
      else{
          id = this.businesses[0].id + 1;
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

        this.businesses.push(business);
        return res.status(201).send({
          message: ['A new business has been added successfully', this.businesses.reverse()]
        });
      }
    }
  }
}


  updateBusiness(req, res) {
    const businessInfo = req.body;
    const userId = parseInt(req.params.userId, 10);
    const user = this.users.find(user => user.id === userId);
    const businessId = parseInt(req.params.businessId, 10);
    const business = this.businesses.find(b => b.id === businessId);
    
    if(!user){
      res.status(500).send({ 
        message: 'Only business owners can update their businesses!'
         });
    }else{

        if(business && business.userId === userId){

        business.businessName = businessInfo.businessName ? 
        businessInfo.businessName : business.businessName;

        business.description = businessInfo.description ?
        businessInfo.description : business.description;

        business.categories = businessInfo.categories ?
        businessInfo.categories : business.categories;

        business.productsOrServices = businessInfo.productsOrServices ?
        businessInfo.productsOrServices : business.businessName;

        business.location = businessInfo.location ?
        businessInfo.location : business.location;

        business.address = businessInfo.address ?
        businessInfo.address : business.address;

        return res.status(201).send({
          message: ['Your business has been updated successfully', this.businesses.reverse()]
        });

        }else{ res.status(404).send({ message: 'Business can not be found!' }); }


      }
    }

}





