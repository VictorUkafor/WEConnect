import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import supertest from 'supertest';
import app from '../index';
import { expect } from 'chai';
import { User, Business } from '../server/models';

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
        }).then(business => { 
          fakeBusiness = business;
          token = jwt.sign({id: user.id }, app.get('lockAndKeys'), { expiresIn: 60 * 60 });
          done();
          })); 
        });
      });
   
  // Testing for 'POST /api/v1/businesses
  describe('POST /api/v1/businesses', () => {
    // Add a new business
    it('Adds a new business', (done) => {
      request.post('/api/v1/businesses')
      .set('x-access-token', token)
        .send({
          businessName: 'VickCode Technologies',
          description: 'Web provides digital solutions',
          categories: ['web design', 'web development'],
          productsOrServices: 'web developments, web designs',
          location: 'Owerri',
          address: 'Owerri',
        })
        .expect(201)
        .end((err) => {
          done(err);
        });
    });

    // A business with this name has already been registered
    it('This business already exist', (done) => {
      request.post('/api/v1/businesses')
      .set('x-access-token', token)
        .send({
          businessName: "VickCode Insurance Ltd",
          description: "We provide insurance solutions",
          categories: ['insurance'],
          productsOrServices: 'car, household',
          location: 'Lagos',
          address: 'Lagos',
        })
        .expect(400)
        .end((err) => {
          done(err);
        });
    });

    // Required fields must be filled
    it('Required fields must be filled', (done) => {
      request.post('/api/v1/businesses')
      .set('x-access-token', token)
        .send({})
        .expect(400)
        .end((err) => {
          done(err);
        });
    });

    // Required fields must be filled
    it('Required fields must be filled', (done) => {
      request.post('/api/v1/businesses')
      .set('x-access-token', token)
        .send({
          productsOrServices: 'web developments, web designs',
          location: 'Lagos',
        })
        .expect(400)
        .end((err) => {
          done(err);
        });
    });

  });

  // Testing for 'PUT /api/v1/businesses/<businessId>'
  describe('PUT /api/v1/businesses/<businessId>', () => {
    // Updates a business
    it('Updates a business', (done) => {
      request.put(`/api/v1/businesses/${fakeBusiness.id}`)
      .set('x-access-token', token)
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
      .set('x-access-token', token)
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
      .set('x-access-token', token)
        .expect(404)
        .end((err) => {
          done(err);
        });
    });

    // Deletes a business
    it('Removes a business', (done) => {
      request.delete(`/api/v1/businesses/${fakeBusiness.id}`)
      .set('x-access-token', token)
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
      request.get('/api/v1/businesses/4')
        .expect(404)
        .end((err) => {
          done(err);
        });
    });

    // Gets a single business
    it('Gets a single business', (done) => {
      request.get(`/api/v1/businesses/${fakeBusiness.id}`)
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

  //   // Testing for 'POST /api/v1/businesses/<businessId>/reviews'
  // describe('POST /api/v1/businesses/<businessId>/reviews', () => {
  //   // Business can not be found
  //   it('Business can not be found', (done) => {
  //     request.post('/api/v1/businesses/1/reviews')
  //       .send({
  //         name: 'Victor Ukafor',
  //         email: 'victorukafor@gmail.com',
  //         reviewContent: 'Cool business',
  //       })
  //       .expect(404)
  //       .end((err) => {
  //         done(err);
  //       });
  //   });

  //   // All fields must be filled
  //   it('All fields must be filled', (done) => {
  //     request.post('/api/v1/businesses/2/reviews')
  //       .send({})
  //       .expect(412)
  //       .end((err) => {
  //         done(err);
  //       });
  //   });

  //   // Review added to a business
  //   it('Review added to a business', (done) => {
  //     request.post('/api/v1/businesses/2/reviews')
  //       .send({
  //         name: 'Victor Ukafor',
  //         email: 'victorukafor@gmail.com',
  //         reviewContent: 'Cool business',
  //       })
  //       .expect(201)
  //       .end((err) => {
  //         done(err);
  //       });
  //   });
  // });

  // // Testing for GET /api/v1/businesses/<businessId>/reviews
  // describe('GET /api/v1/businesses/<businessId>/reviews', () => {
  //   // Business does can not be found
  //   it('Business does can not be found', (done) => {
  //     request.get('/api/v1/businesses/1/reviews')
  //       .expect(404)
  //       .end((err) => {
  //         done(err);
  //       });
  //   });

  //   // Gets all reviews from a business
  //   it('Gets all reviews from a business', (done) => {
  //     request.get('/api/v1/businesses/2/reviews')
  //       .expect(200)
  //       .end((err) => {
  //         done(err);
  //       });
  //   });
  // });

  //     // Testing for GET /api/v1/businesses?location=<location>
  // describe('GET /api/v1/businesses?location=<location>', () => {
  //   // Gets all businesses filtered by location
  //   it('Gets all businesses filtered by location', (done) => {
  //     request.get('/api/v1/businesses?location=Owerri')
  //       .expect(200)
  //       .end((err) => {
  //         done(err);
  //       });
  //   });

  //   // There are no businesses with this location
  //   it('There are no businesses with this location', (done) => {
  //     request.get('/api/v1/businesses?location=Kwara')
  //       .expect(404)
  //       .end((err) => {
  //         done(err);
  //       });
  //   });
  // });


});
