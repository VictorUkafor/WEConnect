import supertest from 'supertest';
import chai from 'chai';
import app from '../server';

const expect = chai.expect;
const request = supertest(app);


describe('WEConnect API Routes', () => {
  beforeEach((done) => {
    // before each route
    done();
  });


  describe('GET /api/v1', () => {
    it('Displays the index page', (done) => {
      request.get('/api/v1')
        .expect(200)
        .end((err, res) => {
          const expected = { message: 'Welcome to the WEConnect app!' };
          expect(res.body).to.eql(expected);
          done(err);
        });
    });
  });

  // Testing for 'POST /api/v1/auth/signup'
  describe('POST /api/v1/auth/signup', () => {

  	// Adds a user successfully
  	it('Adds a new user', (done) => {
  		request.post('/api/v1/auth/signup')
  		.send({
  			firstName: 'Victor',
  			lastName: 'Ukafor',
  			email: 'victorukafor@gmail.com',
  			password: 'password',
  			confirm_password: 'password',
  		})
  		.expect(201)
  		.end((err) => {
  			done(err);
  		});
  	});
    
    // All fields are required
  	it('The First Name field is required', (done) => {
  		request.post('/api/v1/auth/signup')
  		.send({
  			lastName: 'Ukafor',
  			email: 'victorukafor@gmail.com',
  			password: 'password',
  			confirm_password: 'password',
  		})
  		.expect(500)
  		.end((err) => {
  			done(err);
  		});
  	});

  	it('The Last Name field is required', (done) => {
  		request.post('/api/v1/auth/signup')
  		.send({
  			firstName: 'Victor',
  			email: 'victorukafor@gmail.com',
  			password: 'password',
  			confirm_password: 'password',
  		})
  		.expect(500)
  		.end((err) => {
  			done(err);
  		});
  	});

  	it('The Email field is required', (done) => {
  		request.post('/api/v1/auth/signup')
  		.send({
  			firstName: 'Victor',
  			lastName: 'Ukafor',
  			password: 'password',
  			confirm_password: 'password',
  		})
  		.expect(500)
  		.end((err) => {
  			done(err);
  		});
  	}); 

  	it('The Password field is required', (done) => {
  		request.post('/api/v1/auth/signup')
  		.send({
  			firstName: 'Victor',
  			lastName: 'Ukafor',
  			email: 'victorukafor@gmail.com',
  			confirm_password: 'password',
  		})
  		.expect(500)
  		.end((err) => {
  			done(err);
  		});
  	});

  	it('The Confirm Password field is required', (done) => {
  		request.post('/api/v1/auth/signup')
  		.send({
  			firstName: 'Victor',
  			lastName: 'Ukafor',
  			email: 'victorukafor@gmail.com',
  			password: 'password',
  		})
  		.expect(500)
  		.end((err) => {
  			done(err);
  		});
  	}); 

  	it('All fields are required', (done) => {
  		request.post('/api/v1/auth/signup')
  		.send({})
  		.expect(500)
  		.end((err) => {
  			done(err);
  		});
  	}); 
    
    // Password did not match
  	it('Password did not match', (done) => {
  		request.post('/api/v1/auth/signup')
  		.send({
  			firstName: 'Victor',
  			lastName: 'Ukafor',
  			email: 'victorukafor@gmail.com',
  			password: 'password',
  			confirm_password: 'password1',
  		})
  		.expect(500)
  		.end((err) => {
  			done(err);
  		});
  	});
    	    
        // User has already been registered
  	  	it('The user with this email has already been registered', (done) => {
  		request.post('/api/v1/auth/signup')
  		.send({
  			firstName: 'Victor',
  			lastName: 'Ukafor',
  			email: 'victorukafor@gmail.com',
  			password: 'password',
  			confirm_password: 'password',
  		})  		
  		.expect(500)
  		.end((err) => {
  			done(err);
  		});
  	})  	  	 	  	  	  	  	 	  	  	


  });
  

  // Testing for 'POST /api/v1/auth/login'
  describe('POST /api/v1/auth/login', () => {
     
    // logs in a user successfully' 
    it('Logs a user into the app successfully', (done) => {
      request.post('/api/v1/auth/login')
      .send({
      	email: 'victorukafor@gmail.com',
      	password: 'password',
      })  		      
        .expect(201)
        .end((err, res) => {
          done(err);
        });
    });

    // both fields are required' 
    it('Both fields are required', (done) => {
      request.post('/api/v1/auth/login')
      .send({})  		      
        .expect(500)
        .end((err, res) => {
          done(err);
        });
    });

    // invalid email or password' 
    it('Invalid email or password', (done) => {
      request.post('/api/v1/auth/login')
      .send({
      	email: 'victorukafor@gmail.com1',
      	password: 'password',
      })  		      
        .expect(404)
        .end((err, res) => {
          done(err);
        });
    });

    // invalid email or password' 
    it('Invalid email or password', (done) => {
      request.post('/api/v1/auth/login')
      .send({
      	email: 'victorukafor@gmail.com',
      	password: 'password1',
      })  		      
        .expect(404)
        .end((err, res) => {
          done(err);
        });
    });            
  
  }); 


  describe('POST /api/v1/:userId/businesses', () => {
    
    // Add a new business
    it('Adds a new business', (done) => {
    	request.post('/api/v1/1/businesses')
    	.send({
    		businessName: 'VickCode Technologies',
  	        description: 'Web provides digital solutions',
  	        categories: ['web design', 'web development'],
            productsOrServices: 'web developments, web designs',
  	        location: 'Lagos',
  		    address: 'Lagos',
  		})
  		.expect(201)
        .end((err, res) => {
          done(err);
        });
    });

    // Adds another business
    it('Adds a new business', (done) => {
    	request.post('/api/v1/1/businesses')
    	.send({
    		businessName: 'Smart Medicals',
  	        description: 'Web drugs',
  	        categories: ['drugs'],
  	        location: 'Kano',
  		})
  		.expect(201)
        .end((err, res) => {
          done(err);
        });
    });

    // These fields are required
    it('These fields are required', (done) => {
    	request.post('/api/v1/1/businesses')
    	.send({
            productsOrServices: 'web developments, web designs',
  	        location: 'Lagos',
  		})
  		.expect(500)
        .end((err, res) => {
          done(err);
        });
    });

    // Only registered users can add a business
    it('Only authenticated users can register a business', (done) => {
    	request.post('/api/v1/2/businesses')
    	.send({
    		businessName: 'VickCode Technologies',
  	        description: 'Web provides digital solutions',
  	        categories: ['web design', 'web development'],
            productsOrServices: 'web developments, web designs',
  	        location: 'Lagos',
  		    address: 'Lagos',
  		})
  		.expect(500)
        .end((err, res) => {
          done(err);
        });
    })    

  });


  // Testing for 'PUT /api/v1/userId/businesses/businessId'
  describe('PUT /api/v1/:userId/businesses/:businessId', () => {

  	// Updates a business
    it('Updates a business', (done) => {
      request.put('/api/v1/1/businesses/1')
    	.send({
    		businessName: 'VickCode Technologies Limited',
  	        description: 'Web provides digital solutions',
  	        categories: ['web design', 'web development'],
            productsOrServices: 'web developments, web designs',
  	        location: 'Abuja',
  		    address: 'Abuja',
  		})      
        .expect(201)
        .end((err, res) => {
          done(err);
        });
    });

  	// Only business owners can update their businesses
    it('Only business owners can update their businesses', (done) => {
      request.put('/api/v1/2/businesses/1')
    	.send({
    		businessName: 'VickCode Technologies Limited',
  	        description: 'Web provides digital solutions',
  	        categories: ['web design', 'web development'],
            productsOrServices: 'web developments, web designs',
  	        location: 'Abuja',
  		    address: 'Abuja',
  		})      
        .expect(500)
        .end((err, res) => {
          done(err);
        });
    }); 

  	// Business can not b found
    it('Business can not be found', (done) => {
      request.put('/api/v1/1/businesses/3')
    	.send({
    		businessName: 'VickCode Technologies Limited',
  	        description: 'Web provides digital solutions',
  	        categories: ['web design', 'web development'],
            productsOrServices: 'web developments, web designs',
  	        location: 'Abuja',
  		    address: 'Abuja',
  		})      
        .expect(404)
        .end((err, res) => {
          done(err);
        });
    });       

  });


  describe('DELETE /api/v1/:userId/businesses/:businessId', () => {

  	// Only business owners can remove their businesses
    it('Only business owners can remove their businesses', (done) => {
      request.delete('/api/v1/2/businesses/1')
        .expect(500)
        .end((err, res) => {
          done(err);
        });
    });

  	// Business can not be found
    it('Business can not be found', (done) => {
      request.delete('/api/v1/1/businesses/4')
        .expect(404)
        .end((err, res) => {
          done(err);
        });
    });

  	// Deletes a business
    it('Removes a business', (done) => {
      request.delete('/api/v1/1/businesses/1')
        .expect(200)
        .end((err, res) => {
          done(err);
        });
    });

  });

  // Testing for GET /api/v1/businesses
  describe('GET /api/v1/businesses/:businessId', () => {

  	// Business can not be found
    it('Business can not be found', (done) => {
      request.get('/api/v1/businesses/1')
        .expect(404)
        .end((err, res) => {
          done(err);
        });
    });
    
    // Gets a single business
    it('Gets a single business', (done) => {
      request.get('/api/v1/businesses/2')
        .expect(200)
        .end((err, res) => {
          done(err);
        });
    });

  });


  // Testing for GET /api/v1/:userId/businesses
  describe('GET /api/v1/:userId/businesses', () => {

  	// Gets all businesses from a user 
    it('Gets all businesses from a user', (done) => {
      request.get('/api/v1/1/businesses')
        .expect(200)
        .end((err, res) => {
          done(err);
        });
    });

    // User does not have any businesses 
    it('User does not have any businesses', (done) => {
      request.get('/api/v1/2/businesses')
        .expect(404)
        .end((err, res) => {
          done(err);
        });
    });

  });


















});
