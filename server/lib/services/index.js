export default class Service {
  constructor() {
    	this.users = [];
      this.businesses = [];
  }

  getUsers() {
    	return this.users;
  }

  getBusinesses() {
      return this.businesses;
  }

  getSingleUser(userId) {
    	const user = this.users.filter(u => u.id === userId)[0];
    	return user || null;
  }

  getSingleBusiness(businessId) {
      const business = this.businesses.filter(b => b.id === businessId)[0];
      return business || null;
  }

  addUser(info) {
    this.users.push(info);
    return true;
  }

  addBusiness(info) {
    this.businesses.push(info);
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

  updateBusiness(userId, info) {
      const business = this.getSingleBusiness(businessId);
      if (business) {
        business.businessName = info.businessName ? info.businessName : business.businessName;
        return true;
      }

        return false;
  }

}

