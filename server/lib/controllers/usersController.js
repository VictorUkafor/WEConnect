
class UsersController {
	constructor(db) {
    users = db.users;
    businesses = db.businesses;
    reviews = db.reviews;
  }

   postUsers(req, res) {
    const userFields = {
      firstName: 'The firstName field is required',
      lastName: 'The lastName field is required',
      email: 'The email field is required',
      password: 'The password field is required',
      confirm_password: 'The confirm_password field is required'
    };
    const errors = [];
    if (!Object.keys(req.body).length > 0) {
      res.status(500).send({
        message: "All fields are required!"
      });
    } else {

      Object.keys(userFields).forEach((field) => {
        if (!req.body[field]) { errors.push(userFields[field]); }
      });

      if (errors.length > 0) {
        res.status(500).send({ message: errors });
      } else {
       
       if(req.body.password !== req.body.confirm_password){
       	res.status(500).send({ message: "Your password did not match!" });
       }else{

        for(user of this.users){
          if(user["email"] === req.body.email){
            res.status(500).send({ message: "The user with this email has already been registered!" });
          }else{

                const id = this.users.length + 1;
                const firstName = req.body.firstName;
                const lastName = req.body.lastName;
                const email = req.body.email;
                const password = req.body.password;
                const user = { id, firstName, lastName, email, password, }; 

                this.users.push(user);
                return res.status(201).send({
                 message: ['A new user has been added successfully', this.users.reverse()]
             });

       		}
       	}

    }
      }
    }
  }

}




export default UsersController;