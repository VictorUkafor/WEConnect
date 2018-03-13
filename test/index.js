import supertest from 'supertest';
import chai from 'chai';
import app from '../index';

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

  // First Name field is required
    it('First Name field is required', (done) => {
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

  // Last Name field is required
    it('Last Name field is required', (done) => {
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

  // Email field is required
    it('Email field is required', (done) => {
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

  // Password is required
    it('Password is required', (done) => {
      request.post('/api/v1/auth/signup')
        .send({
          firstName: 'Victor',
          lastName: 'Ukafor',
          confirm_password: 'password',
        })
        .expect(500)
        .end((err) => {
          done(err);
        });
    }); 

  // Confirm Password is required
    it('Confirm Password is required', (done) => {
      request.post('/api/v1/auth/signup')
        .send({
          firstName: 'Victor',
          lastName: 'Ukafor',
          password: 'password',
        })
        .expect(500)
        .end((err) => {
          done(err);
        });
    });                    

    // All fields are required
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
    });
  });

  // Testing for 'POST /api/v1/auth/login'
  describe('POST /api/v1/auth/login', () => {
    // logs in a user successfully
    it('Logs a user into the app successfully', (done) => {
      request.post('/api/v1/auth/login')
        .send({
          email: 'victorukafor@gmail.com',
          password: 'password',
        })
        .expect(201)
        .end((err) => {
          done(err);
        });
    });

    // both fields are required
    it('Both fields are required', (done) => {
      request.post('/api/v1/auth/login')
        .send({})
        .expect(500)
        .end((err) => {
          done(err);
        });
    });

    // invalid email or password
    it('Invalid email or password', (done) => {
      request.post('/api/v1/auth/login')
        .send({
          email: 'victorukafor@gmail.com1',
          password: 'password',
        })
        .expect(404)
        .end((err) => {
          done(err);
        });
    });

    // invalid email or password
    it('Invalid email or password', (done) => {
      request.post('/api/v1/auth/login')
        .send({
          email: 'victorukafor@gmail.com',
          password: 'password1',
        })
        .expect(404)
        .end((err) => {
          done(err);
        });
    });
  });

  // Testing for 'POST /api/v1/<userId>/businesses
  describe('POST /api/v1/<userId>/businesses', () => {
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
        .end((err) => {
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
        .end((err) => {
          done(err);
        });
    });

    // Adds another business
    it('Adds a new business', (done) => {
      request.post('/api/v1/1/businesses')
        .send({
          businessName: 'Smart Medicals2',
          description: 'Web drugs',
          categories: ['drugs'],
          location: 'Kano',
        })
        .expect(201)
        .end((err) => {
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
        .end((err) => {
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
        .end((err) => {
          done(err);
        });
    });
  });

  
});
