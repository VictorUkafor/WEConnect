/**
 * @fileOverview this JS file contains logic for business' APIs logic
 *
 * @author  Victor Ukafor
 * @version 1.0.0
 *
 */


/**
 * A class to represents businesses controller
 * @class
 */
export default class BusinessesController {
  /**
   * @constructor
   * @param {object} Business
   * @param {object} Review
   */
  constructor(Business, Review) {
    this.Business = Business;
    this.Review = Review;
    this.postBusiness = this.postBusiness.bind(this);
    this.updateBusiness = this.updateBusiness.bind(this);
    this.removeBusiness = this.removeBusiness.bind(this);
    this.getBusiness = this.getBusiness.bind(this);
    this.getAllBusinesses = this.getAllBusinesses.bind(this);
  }

  /**
   * Takes req and res to return the business object
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} the business object
   */
  postBusiness(req, res) {
    return this.Business.create({
      userId: req.user.id,
      businessName: req.body.businessName,
      description: req.body.description,
      productsOrServices: req.body.productsOrServices,
      categories: req.body.categories,
      location: req.body.location,
      address: req.body.address
    }).then(business => res.status(201).send({
      message: ['A new business has been added successfully', business]
    }));
  }

  /**
   * Takes req and res to return the business object
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} the business object
   */
  updateBusiness(req, res) {
    return this.Business.findOne({ where: { id: req.business.id } })
      .then((businessToUpdate) => {
        businessToUpdate.update({
          description: req.body.description || req.business.description,
          categories: req.body.categories || req.business.categories,
          productsOrServices: req.body.productsOrServices || req.business.productsOrServices,
          location: req.body.location || req.business.location,
          address: req.body.address || req.business.address
        })
          .then(businessUpdated => res.status(201).send({
            message: ['This business has been updated successfully', businessUpdated]
          }));
      });
  }

  /**
   * Takes req and res to return the business object
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} the business object
   */
  removeBusiness(req, res) {
    return this.Business.findOne({ where: { id: req.business.id } })
      .then((businessToDelete) => {
        businessToDelete.destroy().then(() => {
          res.status(200).send({
            message: 'This business has been deleted successfully'
          });
        });
      });
  }

  /**
   * Takes req and res to return the business object
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} the business object
   */
  getBusiness(req, res) {
    const businessId = parseInt(req.params.businessId, 10);

    return this.Business.findOne({
      where: { id: businessId },
      include: [{ model: this.Review, as: 'reviews', }],
    }).then((business) => {
      if (!business) {
        return res.status(404).send({
          message: 'This business can not be found!'
        });
      }
      return res.status(200).send(business);
    });
  }

  /**
   * Takes req and res to return the business object
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} the business object
   */
  getAllBusinesses(req, res) {
    if (req.query.location) {
      return this.Business.findAll({
        where: { location: req.query.location },
        include: [{ model: this.Review, as: 'reviews', }],
      }).then((businesses) => {
        if (businesses.length > 0) {
          return res.status(200).send(businesses);
        } return res.status(404).send({
          message: 'There are no businesses yet with this location!'
        });
      });
    } else if (req.query.category) {
      return this.Business.findAll({
        include: [{ model: this.Review, as: 'reviews', }]
      }).then((businesses) => {
        if (businesses.length) {
          const businessesWithThisCategory = [];
          businesses.forEach((business) => {
            if (business.categories.indexOf(req.query.category) > -1) {
              businessesWithThisCategory.push(business);
            }
          });

          if (businessesWithThisCategory.length) {
            return res.status(200).send(businessesWithThisCategory);
          } return res.status(404).send({
            message: 'There are no businesses yet with this category!'
          });
        } return res.status(404).send({
          message: 'There are no businesses yet with this category!'
        });
      });
    } return this.Business.findAll({
      include: [{ model: this.Review, as: 'reviews', }]
    }).then((businesses) => {
      if (!businesses) {
        return res.status(404).send({ message: 'There are no businesses yet!' });
      } return res.status(200).send(businesses);
    });
  }
}

