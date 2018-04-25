import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import supertest from 'supertest';
import app from '../index';
import { expect } from 'chai';
import { User, Business, Review } from '../server/models';

const request = supertest(app);

describe('WEConnect API Routes', () => {
  const salt = bcrypt.genSaltSync(10);
  const encryptedPassword = bcrypt.hashSync("password", salt);
  let token;
  let fakeBusiness;
  beforeEach((done) => {
    User.destroy({where: {}})
    .then(() => User.create({
      firstName: "Victor",
      lastName: "Ukafor",
      email: "victorukafor@gmail.com",
      password: encryptedPassword,
    })).then(user => {
       Business.destroy({where: {}})
       .then(() => Business.create({
         businessName: "VickCode Insurance Ltd",
         description: "We provide insurance solutions",
         categories: ['insurance'],
         productsOrServices: 'car, household',
         location: 'Lagos',
         address: 'Lagos',
         userId: user.id,
        })).then(business => { 
          fakeBusiness = business;
          token = jwt.sign({id: user.id }, app.get('lockAndKeys'), { expiresIn: 60 * 60 });
          Review.destroy({where: {}})
          .then(() => Review.create({
            name: "Victor Ukafor",
            email: "victorukafor@gmail.com",
            reviewBody: 'cool biz!',
            businessId: business.id,
           }));  
          done();
          }); 
        });
      });
   

    // Testing for 'POST /api/v1/businesses/<businessId>/reviews'
  describe('POST /api/v1/businesses/<businessId>/reviews', () => {
    // Business can not be found
    it('Business can not be found', (done) => {
      request.post('/api/v1/businesses/4/reviews')
      .set('x-access-token', token)
        .send({
          reviewBody: 'Cool business',
        })
        .expect(404)
        .end((err) => {
          done(err);
        });
    });

    // All fields must be filled
    it('All fields must be filled', (done) => {
      request.post(`/api/v1/businesses/${fakeBusiness.id}/reviews`)
      .set('x-access-token', token)
        .send({})
        .expect(400)
        .end((err) => {
          done(err);
        });
    });

    // Review added to a business
    it('Review added to a business', (done) => {
      request.post(`/api/v1/businesses/${fakeBusiness.id}/reviews`)
      .set('x-access-token', token) 
        .send({
          reviewBody: 'great business',
        })
        .expect(201)
        .end((err) => {
          done(err);
        });
    });

  });

  // Testing for GET /api/v1/businesses/<businessId>/reviews
  describe('GET /api/v1/businesses/<businessId>/reviews', () => {
    // Business does can not be found
    it('Business does can not be found', (done) => {
      request.get('/api/v1/businesses/5/reviews')
      .set('x-access-token', token)
        .expect(404)
        .end((err) => {
          done(err);
        });
    });

    // Gets all reviews from a business
    it('Gets all reviews from a business', (done) => {
      request.get(`/api/v1/businesses/${fakeBusiness.id}/reviews`)
        .expect(200)
        .end((err) => {
          done(err);
        });
    });
  });

 });
