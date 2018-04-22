import { Business } from '../models';


export default class BusinessesController {
  static postBusiness(req, res) {
    const { body: businessInfo } = req;

    return Business.create({
      userId: req.user.id,
      businessName: businessInfo.businessName,
      description: businessInfo.description,
      categories: businessInfo.categories,
      productsOrServices: businessInfo.productsOrServices,
      location: businessInfo.location,
      address: businessInfo.address
    }).then(business => res.status(201).send({
      message: ['A new business has been added successfully', business]
    })).catch(error => res.status(500));
  }


  static updateBusiness(req, res) {
    const { body: businessInfo } = req;

    req.business.update({
      description: businessInfo.description || req.business.description,
      categories: businessInfo.categories || req.business.categories,
      productsOrServices: businessInfo.productsOrServices || req.business.productsOrServices,
      location: businessInfo.location || req.business.location,
      address: businessInfo.address || req.business.address
    })
      .then((business) => {
        res.status(201).send({
          message: ['This business has been updated successfully', business]
        });
      }).catch((error) => { res.status(500); });
  }

  static removeBusiness(req, res) {
    // Review.findAll({ where: { businessId: req.business.id } })
    //   .then((reviews) => {
    //     if (reviews) {
    //       Review.destroy({ where: { businessId: req.business.id } });
    //       req.business.destroy().then(() => {
    //         res.status(200).send({
    //           message: 'This business has been deleted successfully'
    //         });
    //       }).catch((error) => { res.status(500); });
    //     } else {
          req.business.destroy().then(() => {
            res.status(200).send({
              message: 'This business has been deleted successfully'
            });
          }).catch((error) => { res.status(500); });
      //   }
      // });
  }

  static getBusiness(req, res) {
    const businessId = parseInt(req.params.businessId, 10);

    Business.findOne({
      where: { id: businessId },
//include: [{ model: Review, as: 'businessReviews', }],
    }).then((business) => {
      if (!business) {
        res.status(404).send({ message: 'This business can not be found!' });
      } else {
        res.status(200).send(business);
      }
    });
  }


  static getAllBusinesses(req, res) {
    if (req.query.location) {
      Business.findAll({
        where: { location: req.query.location },
        //include: [{ model: Review, as: 'businessReviews', }],
      }).then((businesses) => {
        if (businesses.length > 0) {
          res.status(200).send(businesses);
        } else {
          res.status(404).send({ message: 'There are no businesses yet with this location!' });
        }
      });
    } else if (req.query.category) {
      Business.findAll({ 
        //include: [{ model: Review, as: 'businessReviews', }]
       }).then((businesses) => {
        if (businesses.length) {
          const businessesWithThisCategory = [];
          for (const business of businesses) {
            if (business.categories.indexOf(req.query.category) > -1) {
              businessesWithThisCategory.push(business);
            }
          }

          if (businessesWithThisCategory.length) {
            res.status(200).send(businessesWithThisCategory);
          } else {
            res.status(404).send({ message: 'There are no businesses yet with this category!' });
          }
        } else {
          res.status(404).send({ message: 'There are no businesses yet with this category!' });
        }
      });
    } else {
      Business.findAll({ 
        //include: [{ model: Review, as: 'businessReviews', }]
       }).then((businesses) => {
        if (!businesses) {
          res.status(404).send({ message: 'There are no businesses yet!' });
        } else {
          res.status(200).send(businesses);
        }
      });
    }
  }
}

