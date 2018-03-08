import uuid from 'uuid';

export default class AllController {
  constructor(router) {
    this.router = router;
    this.registerRoutes();
    this.users = [];
    this.businesses = [];
    this.reviews = [];
  }

  registerRoutes() {
    this.router.post('/auth/signup', this.postUser.bind(this));
    this.router.post('/auth/login', this.loginUser.bind(this));
    this.router.post('/:userId/businesses', this.postBusiness.bind(this));
    this.router.put('/:userId/businesses/:businessId', this.updateBusiness.bind(this));
    this.router.delete('/:userId/businesses/:businessId', this.removeBusiness.bind(this));
    this.router.get('/businesses/:businessId', this.getBusiness.bind(this));
    this.router.get('/:userId/businesses', this.getUserBusinesses.bind(this));
    this.router.get('/businesses', this.getAllBusinesses.bind(this));
    this.router.post('/:userId/businesses/:businessId/reviews', this.postReview.bind(this));
    this.router.get('/businesses/:businessId/reviews', this.getReviews.bind(this));

  }

  postUser(req, res) {
    const userInfo = req.body;
    const errors = [];
    const reqEmail = this.users.find(u => u.email === userInfo.email);

    let id = '';
    if(this.users.length === 0){ 
      id = 1; }
      else{
          id = this.users[this.users.length - 1].id + 1;
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
          id = this.businesses[this.businesses.length - 1].id + 1;
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

        }else{ res.status(404).send({  message: 'Business can not be found!' }); }


      }
    }


    removeBusiness(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const user = this.users.find(user => user.id === userId);
    const businessId = parseInt(req.params.businessId, 10);
    const business = this.businesses.find(b => b.id === businessId);
    
    if(!user){
      res.status(500).send({ 
        message: 'Only business owners can remove their businesses!'
         });
    }else{

        if(business && business.userId === userId){

       this.businesses = this.businesses.filter(b => b.id !== businessId);

        res.status(200).send({
          message: ['Your business has been removed successfully', this.businesses]
        });

        }else{ res.status(404).send({ message: 'Business can not be found!' }); }


      }
    }


    getBusiness(req, res) {
    const businessId = parseInt(req.params.businessId, 10);
    const business = this.businesses.find(b => b.id === businessId);
    
    if(!business){
      res.status(500).send({ message: 'Business can not be found!' });
    }else{ res.status(200).send({ message: business }); }
    
    }


    getUserBusinesses(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const Businesses = this.businesses.filter(b => b.userId === userId);
    
    if(!Businesses || Businesses.length === 0){
      res.status(500).send({ message: 'You have no business!' });
    }else{ res.status(200).send({ message: Businesses }); }
    
    }


    getAllBusinesses(req, res) {    
    if(this.businesses.length === 0){
      res.status(500).send({ message: 'There are no businesses yet!' });
    }else if(req.query.location){

      const locationBiz = this.businesses.filter(b => b.location === req.query.location);
      if(locationBiz.length === 0){
        res.status(404).send({ message: 'There are no businesses with this location' });
      }else{
        res.status(200).send({ message: locationBiz });
      }
    }else if(req.query.category){

      const categoryBiz = this.businesses.filter(b => b.categories.indexOf(req.query.category) > -1 );
      if(categoryBiz.length === 0){
        res.status(404).send({ message: 'There are no businesses with this category' });
      }else{
        res.status(200).send({ message: categoryBiz });
      }
    }else{ 
      res.status(200).send({ message: ['All businesses', this.businesses] }); 
    }
    
    }


    postReview(req, res) {
    const reviewInfo = req.body;
    const userId = parseInt(req.params.userId, 10);
    const businessId = parseInt(req.params.businessId, 10);
    const user = this.users.find(user => user.id === userId);
    const business = this.businesses.find(b => b.id === businessId);

    let id = '';
    if(this.reviews.length === 0){ 
      id = 1; }
      else{
          id = this.reviews[this.reviews.length - 1].id + 1;
        }
    
    if(!user){
      res.status(500).send({ 
        message: 'Only registered users can add a review!'
         });
    }else if(!business){
      res.status(404).send({ 
        message: 'Business can not be found!'
         });
    }else{
        
    if (Object.keys(reviewInfo).length === 0) {
      res.status(500).send({ message: 'Please add your comment!'
      });
    } else {
      
        const reviewBody = reviewInfo.reviewBody;
        const reviewer = user.firstName + " " + user.lastName;
        const review = { id, businessId, reviewer, reviewBody, };

        this.reviews.push(review);
        const singleBusinessReview = this.reviews.filter(r => r.businessId === businessId);
        return res.status(201).send({
          message: ['Review added successfully', singleBusinessReview.reverse()]
        });
      }
    }
  }


    getReviews(req, res) {
    const businessId = parseInt(req.params.businessId, 10);
    const business = this.businesses.find(b => b.id === businessId);
    const singleBusinessReviews = this.reviews.filter(r => r.businessId === businessId);

    if(!business){
      res.status(404).send({ message: 'Business can not be found!'
         });
    }else if(!singleBusinessReviews){
      res.status(404).send({ message: 'This business has no reviews!'
         });
    }else{ 
      res.status(201).send({
          message: singleBusinessReviews.reverse()
        });
    }

}

}





