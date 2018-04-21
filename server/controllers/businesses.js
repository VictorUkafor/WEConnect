import uuid from 'uuid';

let businesses = [];
let reviews = [];

export default class BusinessesController {

  static postBusiness(req, res) {
    const { body: businessInfo } = req;
    const errors = [];
    const regBusiness = businesses.find(b => b.businessName === businessInfo.businessName);

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
        const id = businesses.length + 1;
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

        businesses.push(business);
        return res.status(201).send({
          message: ['A new business has been added successfully', business]
        });
      }
    }
  }

  
  static updateBusiness(req, res) {
    const { body: businessInfo } = req;
    const businessId = parseInt(req.params.businessId, 10);
    const businessToUpdate = businesses.find(b => b.id === businessId);

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


  static removeBusiness(req, res) {
    const businessId = parseInt(req.params.businessId, 10);
    const businessToRemove = businesses.find(b => b.id === businessId);

    if (!businessToRemove) {
      res.status(404).send({
        message: 'Business can not be found!'
      });
    } else {
      businesses = businesses.filter(b => b.id !== businessId);

      res.status(200).send({
        message: ['Your business has been removed successfully', businesses]
      });
  }

}


  static getBusiness(req, res) {
    const businessId = parseInt(req.params.businessId, 10);
    const businessToGet = businesses.find(b => b.id === businessId);

    if (!businessToGet) {
      res.status(404).send({ message: 'Business can not be found!' });
    } else { res.status(200).send({ message: businessToGet }); }
  }


  static getAllBusinesses(req, res) {
    if (businesses.length === 0) {
      res.status(404).send({ message: 'There are no businesses yet!' });
    } else if (req.query.location) {
      const businessesWithThisLocation = businesses.filter(b => b.location === req.query.location);
      if (businessesWithThisLocation.length === 0) {
        res.status(404).send({ message: 'There are no businesses with this location' });
      } else {
        res.status(200).send({ message: businessesWithThisLocation });
      }
    } else if (req.query.category) {
      const businessesWithThisCategory =
      businesses.filter(b => b.categories.indexOf(req.query.category) > -1);
      if (businessesWithThisCategory.length === 0) {
        res.status(404).send({ message: 'There are no businesses with this category' });
      } else {
        res.status(200).send({ message: businessesWithThisCategory });
      }
    } else {
      res.status(200).send({ message: ['All businesses', businesses] });
    }
  }

  static postReview(req, res) {
    const reviewInfo = req.body;
    const businessId = parseInt(req.params.businessId, 10);
    const businessToPost = businesses.find(b => b.id === businessId);
    const errors = [];

    const reviewFields = {
      name: 'The Name field is required',
      email: 'The Email field is required',
      reviewContent: 'Review must be entered',
    };

    Object.keys(reviewFields).forEach((field) => {
      if (!reviewInfo[field]) { errors.push(reviewFields[field]); }
      });

    if (!businessToPost) {
      res.status(404).send({
        message: 'Business can not be found!'
      });
    } else if (!Object.keys(reviewInfo).length > 0) {
      res.status(500).send({
        message: 'All fields are required!'
      });
    } else if (errors.length > 0) {
      res.status(500).send({ message: errors });
    } else {

      const id = uuid.v4(); 
      const { name } = reviewInfo;
      const { email } = reviewInfo;
      const { reviewContent }  = reviewInfo;
      const review = {
        id, businessId, name, email, reviewContent,
      };

      reviews.push(review);
      const singleBusinessReview = reviews.filter(r => r.businessId === businessId);
      return res.status(201).send({
        message: ['Review added successfully', singleBusinessReview]
      });
    }
  }

  static getReviews(req, res) {
    const businessId = parseInt(req.params.businessId, 10);
    const businessToReview = businesses.find(b => b.id === businessId);
    const singleBusinessReviews = reviews.filter(r => r.businessId === businessId);

    if (!businessToReview) {
      res.status(404).send({ message: 'Business can not be found!' });
    } else if (!singleBusinessReviews) {
      res.status(404).send({ message: 'This business has no reviews!' });
    } else {
      res.status(200).send({ message: singleBusinessReviews });
    }
  }  
  

}

