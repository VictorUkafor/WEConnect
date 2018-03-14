export default class UsersService {
  constructor(db) {
    	this.users = db.users;
  }

  getUsers() {
    	return this.users;
  }

  getSingleUsers(userId) {
    	const user = this.users.filter(u => u.id === userId)[0];
    	return user || null;
  }

  addUser(info) {
    this.users.push(info);
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
