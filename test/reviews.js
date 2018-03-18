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

  // Testing for 'POST /api/v1/businesses/<businessId>/reviews'
  describe('POST /api/v1/businesses/<businessId>/reviews', () => {
    // Business can not be found
    it('Business can not be found', (done) => {
      request.post('/api/v1/businesses/1/reviews')
        .send({
          reviewBody: 'Cool business',
        })
        .expect(404)
        .end((err) => {
          done(err);
        });
    });

    // Review content must be entered
    it('Review content must be entered', (done) => {
      request.post('/api/v1/businesses/2/reviews')
        .send({})
        .expect(500)
        .end((err) => {
          done(err);
        });
    });

    // Review added to a business
    it('Review added to a business', (done) => {
      request.post('/api/v1/businesses/2/reviews')
        .send({ reviewBody: 'Cool business', })
        .expect(201)
        .end((err) => {
          done(err);
        });
    });
  });

});
