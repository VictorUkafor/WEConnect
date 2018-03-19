
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
        } else if(regBusiness) {
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


}

