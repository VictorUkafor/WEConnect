import sequelize from 'sequelize';
import models from '../server/models';
import supertest from 'supertest';
import chai from 'chai';
import app from '../index';

const User = models.User;
const Business = models.Business;
const expect = chai.expect;
const request = supertest(app);


describe('WEConnect API Routes', () => {
  before((done) => {
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
  //Adds a user successfully
    it('Adds a new user', (done) => {
      request.post('/api/v1/auth/signup')
        .send({
          firstName: 'Victor',
          lastName: 'Ukafor',
          email: 'ukafor@gmail.com',
          password: 'password',
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
        .expect(405)
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
        })
        .expect(406)
        .end((err) => {
          done(err);
        });
    });
  });

  // // Testing for 'POST /api/v1/auth/login'
  // describe('POST /api/v1/auth/login', () => {
  //   // logs in a user successfully
  //   it('Logs a user into the app successfully', (done) => {
  //     request.post('/api/v1/auth/login')
  //       .send({
  //         email: 'victorukafor@gmail.com',
  //         password: 'password',
  //       })
  //       .expect(201)
  //       .end((err) => {
  //         done(err);
  //       });
  //   });

  //   // both fields are required
  //   it('Both fields are required', (done) => {
  //     request.post('/api/v1/auth/login')
  //       .send({})
  //       .expect(500)
  //       .end((err) => {
  //         done(err);
  //       });
  //   });

  //   // invalid email or password
  //   it('Invalid email or password', (done) => {
  //     request.post('/api/v1/auth/login')
  //       .send({
  //         email: 'victorukafor@gmail.com1',
  //         password: 'password',
  //       })
  //       .expect(404)
  //       .end((err) => {
  //         done(err);
  //       });
  //   });

  //   // invalid email or password
  //   it('Invalid email or password', (done) => {
  //     request.post('/api/v1/auth/login')
  //       .send({
  //         email: 'victorukafor@gmail.com',
  //         password: 'password1',
  //       })
  //       .expect(404)
  //       .end((err) => {
  //         done(err);
  //       });
  //   });
  // });

});
