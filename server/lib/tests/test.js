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
    it('logs a user into the app successfully', (done) => {
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
    it('both fields are required', (done) => {
      request.post('/api/v1/auth/login')
      .send({})  		      
        .expect(500)
        .end((err, res) => {
          done(err);
        });
    });

    // invalid email or password' 
    it('invalid email or password', (done) => {
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
    it('invalid email or password', (done) => {
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
    it('adds a new business', (done) => {
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

    // These fields are required
    it('these fields are required', (done) => {
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
    it('only authenticated users can register a business', (done) => {
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















});
