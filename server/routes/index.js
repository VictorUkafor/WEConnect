import usersController from '../controllers/users';


export default (app) => {
	app.get('/api/v1', (req, res) => res.status(200).send({
		message: 'Welcome to the WEConnect API!',
	}));
	app.get('/api/v1/all', usersController.allUsers);
	app.post('/api/v1/auth/signup', usersController.create);	
};