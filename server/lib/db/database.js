import uuid from 'uuid';

export default database = {
  users: [
    {
      id: uuid.v4(),
      firstName: 'Victor',
      lastName: 'Ukafor',
      email: 'victorukafor@gmail.com',
      password: 'password123',
    }, {
      id: uuid.v4(),
      firstName: 'Kent',
      lastName: 'Westwood',
      email: 'kentwestwood@gmail.com',
      password: 'password',
    }
  ],

  businesses: [],
  reviews: [],


};

