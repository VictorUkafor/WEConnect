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

  // Testing for 'POST /api/v1/businesses
  describe('POST /api/v1/businesses', () => {
    // Add a new business
    it('Adds a new business', (done) => {
      request.post('/api/v1/businesses')
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

    // A business with this name has already been registered
    it('Business already exist', (done) => {
      request.post('/api/v1/businesses')
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

        // Required fields must be filled
    it('Required fields must be filled', (done) => {
      request.post('/api/v1/businesses')
        .send({})
        .expect(500)
        .end((err) => {
          done(err);
        });
    });

    // Required fields must be filled
    it('Required fields must be filled', (done) => {
      request.post('/api/v1/businesses')
        .send({
          productsOrServices: 'web developments, web designs',
          location: 'Lagos',
        })
        .expect(500)
        .end((err) => {
          done(err);
        });
    });

  });

});
