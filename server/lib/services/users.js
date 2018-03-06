export default class UsersService {
  constructor() {
    	this.users = [];
  }

  getUsers() {
    	return this.users;
  }

  getSingleUser(userId) {
    	const user = this.users.filter(u => u.id === userId)[0];
    	return user || null;
  }

  addUser(info) {
    this.users.push(info);
    return true;
  }

  loginUser(info){
  		return true;
  	}
  

  updateUser(userId, info) {
     	const user = this.getSingleUser(userId);
     	if (user) {
     		user.firstName = info.firstName ? info.firstName : user.firstName;
     		user.lastName = info.lastName ? info.lastName : user.lastName;
     		return true;
     	}

     		return false;
  }

}
