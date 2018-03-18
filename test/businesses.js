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

    // Adds another business
    it('Adds another business', (done) => {
      request.post('/api/v1/businesses')
        .send({
          businessName: 'VickCode Solutions',
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
    it('Business can not be found', (done) => {
      request.put('/api/v1/businesses/4')
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

  // Testing for 'DELETE /api/v1/businesses/<businessId>'
  describe('DELETE /api/v1/businesses/<businessId>', () => {
    // Business can not be found
    it('Business can not be found', (done) => {
      request.delete('/api/v1/businesses/4')
        .expect(404)
        .end((err) => {
          done(err);
        });
    });

    // Deletes a business
    it('Removes a business', (done) => {
      request.delete('/api/v1/businesses/1')
        .expect(200)
        .end((err) => {
          done(err);
        });
    });
  });

  // Testing for GET /api/v1/businesses
  describe('GET /api/v1/businesses/<businessId>', () => {
    // Business can not be found
    it('Business can not be found', (done) => {
      request.get('/api/v1/businesses/1')
        .expect(404)
        .end((err) => {
          done(err);
        });
    });

    // Gets a single business
    it('Gets a single business', (done) => {
      request.get('/api/v1/businesses/2')
        .expect(200)
        .end((err) => {
          done(err);
        });
    });
  });

  // Testing for GET /api/v1/businesses
  describe('GET /api/v1/businesses', () => {
    it('Gets all businesses', (done) => {
      request.get('/api/v1/businesses')
        .expect(200)
        .end((err) => {
          done(err);
        });
    });

    // Businesses can not be found
    it('Businesses can not be found', (done) => {
      request.get('/api/v1/business')
        .expect(404)
        .end((err) => {
          done(err);
        });
    });
  });

    // Testing for 'POST /api/v1/businesses/<businessId>/reviews'
  describe('POST /api/v1/businesses/<businessId>/reviews', () => {
    // Business can not be found
    it('Business can not be found', (done) => {
      request.post('/api/v1/businesses/1/reviews')
        .send({
          name: 'Victor Ukafor',
          email: 'victorukafor@gmail.com',
          reviewContent: 'Cool business',
        })
        .expect(404)
        .end((err) => {
          done(err);
        });
    });

    // All fields must be filled
    it('All fields must be filled', (done) => {
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
        .send({
          name: 'Victor Ukafor',
          email: 'victorukafor@gmail.com',
          reviewContent: 'Cool business',
        })
        .expect(201)
        .end((err) => {
          done(err);
        });
    });
  });


});
