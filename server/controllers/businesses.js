
/**
  *  class AllController
  *
  */
export default class BusinessesController {
/**
  *  constructor
  *  Takes one parameter
  *  @param {object} router the first parameter
  *
  */
  constructor(router) {
    this.router = router;
    this.registerRoutes();
    this.businesses = [];
  }


  /**
  *  contains routes for all APIs
  *  @returns {object} return an object
  *
  */
  registerRoutes() {
    this.router.post('/businesses', this.postBusiness.bind(this));
    this.router.put('/businesses/:businessId', this.updateBusiness.bind(this));
    this.router.delete('/businesses/:businessId', this.removeBusiness.bind(this));
    this.router.get('/businesses/:businessId', this.getBusiness.bind(this));
    this.router.get('/businesses', this.getAllBusinesses.bind(this));
  }

  /**
   *  An API for adding a business
   *  POST: /businesses
   *  Takes 2 parameters
   *  @param {object} req the first parameter
   *  @param  {object} res the second parameter
   *
   *  @returns {object} return an object
   */
  postBusiness(req, res) {
    const { body: businessInfo } = req;
    const errors = [];
    const regBusiness = this.businesses.find(b => b.businessName === businessInfo.businessName);

    const businessFields = {
      businessName: 'The Name of the Business is required',
      description: 'The Business description is required',
      location: 'The Location field is required',
      categories: 'You must select atleast one category',
    };

    if (Object.keys(businessInfo).length === 0) {
      res.status(500).send({
        message: 'Please fill in all required fields!'
      });
    } else {
      Object.keys(businessFields).forEach((field) => {
        if (!businessInfo[field]) { errors.push(businessFields[field]); }
      });

      if (errors.length > 0) {
        res.status(500).send({ message: errors });
      } else if (regBusiness) {
        res.status(500).send({ message: 'A business with this name has already been registered!' });
      } else {
        const id = this.businesses.length + 1;
        const { businessName } = businessInfo;
        const { description } = businessInfo;
        const { categories } = businessInfo;
        const { productsOrServices } = businessInfo;
        const { location } = businessInfo;
        const { address } = businessInfo;
        const business = {
          id,
          businessName,
          description,
          categories,
          productsOrServices,
          location,
          address
        };

        this.businesses.push(business);
        return res.status(201).send({
          message: ['A new business has been added successfully', business]
        });
      }
    }
  }

  /**
   *  An API for updating a business
   *  PUT: /businesses/<businessId>
   *  Takes 2 parameters
   *  @param {object} req the first parameter
   *  @param  {object} res the second parameter
   *
   *  @returns {object} return an object
   */
  updateBusiness(req, res) {
    const { body: businessInfo } = req;
    const businessId = parseInt(req.params.businessId, 10);
    const businessToUpdate = this.businesses.find(b => b.id === businessId);

    if (!businessToUpdate) {
      res.status(404).send({
        message: 'Business can not be found!'
      });
    } else {
        businessToUpdate.businessName = businessInfo.businessName ?
          businessInfo.businessName : businessToUpdate.businessName;

        businessToUpdate.description = businessInfo.description ?
          businessInfo.description : businessToUpdate.description;

        businessToUpdate.categories = businessInfo.categories ?
          businessInfo.categories : businessToUpdate.categories;

        businessToUpdate.productsOrServices = businessInfo.productsOrServices ?
          businessInfo.productsOrServices : businessToUpdate.businessName;

        businessToUpdate.location = businessInfo.location ?
          businessInfo.location : businessToUpdate.location;

        businessToUpdate.address = businessInfo.address ?
          businessInfo.address : businessToUpdate.address;

        return res.status(201).send({
          message: ['Your business has been updated successfully', businessToUpdate]
        });
    }
  }

    /**
   *  An API for removing a business
   *  DELETE: /businesses/<businessId>
   *  Takes 2 parameters
   *  @param {object} req the first parameter
   *  @param  {object} res the second parameter
   *
   *  @returns {object} return an object
   */
  removeBusiness(req, res) {
    const businessId = parseInt(req.params.businessId, 10);
    const businessToRemove = this.businesses.find(b => b.id === businessId);

    if (!businessToRemove) {
      res.status(404).send({
        message: 'Business can not be found!'
      });
    } else {
      this.businesses = this.businesses.filter(b => b.id !== businessId);

      res.status(200).send({
        message: ['Your business has been removed successfully', this.businesses]
      });
  }

}

  /**
   *  An API for getting a single business
   *  GET: /businesses/<businessId>
   *  Takes 2 parameters
   *  @param {object} req the first parameter
   *  @param  {object} res the second parameter
   *
   *  @returns {object} return an object
   */
  getBusiness(req, res) {
    const businessId = parseInt(req.params.businessId, 10);
    const businessToGet = this.businesses.find(b => b.id === businessId);

    if (!businessToGet) {
      res.status(404).send({ message: 'Business can not be found!' });
    } else { res.status(200).send({ message: businessToGet }); }
  }

  /**
   *  An API for getting all businesses
   *  GET: /businesses
   *  Takes 2 parameters
   *  @param {object} req the first parameter
   *  @param  {object} res the second parameter
   *
   *  @returns {object} return an object
   */
  getAllBusinesses(req, res) {
    if (this.businesses.length === 0) {
      res.status(404).send({ message: 'There are no businesses yet!' });
    } else {
      res.status(200).send({ message: ['All businesses', this.businesses] });
    }
  }


}

