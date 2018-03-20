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

    // All fields are required
    it('All fields are required', (done) => {
      request.post('/api/v1/auth/signup')
        .send({})
        .expect(412)
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
        .expect(403)
        .end((err) => {
          done(err);
        });
    });
  });

});
