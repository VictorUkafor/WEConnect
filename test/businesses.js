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
        .expect(500)
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

  // Testing for 'PUT /api/v1/businesses/<businessId>'
  describe('PUT /api/v1/businesses/<businessId>', () => {
    // Updates a business
    it('Updates a business', (done) => {
      request.put('/api/v1/businesses/1')
        .send({
          businessName: 'VickCode Technologies Limited',
          description: 'Web provides digital solutions',
          categories: ['web design', 'web development'],
          productsOrServices: 'web developments, web designs',
          location: 'Abuja',
          address: 'Abuja',
        })
        .expect(201)
        .end((err) => {
          done(err);
        });
    });

    // Business can not be found
    it('Only business owners can update their businesses', (done) => {
      request.put('/api/v1/businesses/2')
        .send({
          businessName: 'VickCode Solutions',
          description: 'Web provides digital solutions',
          categories: ['web design', 'web development'],
          productsOrServices: 'web developments, web designs',
          location: 'Lagos',
          address: 'Lagos',
        })
        .expect(404)
        .end((err) => {
          done(err);
        });
    });

    });


});
