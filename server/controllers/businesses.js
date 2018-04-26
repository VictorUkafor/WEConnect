/**
 * @fileOverview this JS file contains logic for business' APIs logic
 *
 * @author  Victor Ukafor
 * @version 1.0.0
 *
 */

import { Business, Review } from '../models';


/**
 * A class to represents businesses controller
 * @class
 */
export default class BusinessesController {
  /**
   * Takes req and res to return the business object
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} the business object
   */
  static postBusiness(req, res) {
    const { body: businessInfo } = req;

    return Business.create({
      userId: req.user.id,
      businessName: businessInfo.businessName,
      description: businessInfo.description,
      productsOrServices: businessInfo.productsOrServices,
      categories: businessInfo.categories,
      location: businessInfo.location,
      address: businessInfo.address
    }).then(business => res.status(201).send({
      message: ['A new business has been added successfully', business]
    })).catch(() => res.status(500));
  }

  /**
   * Takes req and res to return the business object
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} the business object
   */
  static updateBusiness(req, res) {
    const { body: businessInfo } = req;

    return req.business.update({
      description: businessInfo.description || req.business.description,
      categories: businessInfo.categories || req.business.categories,
      productsOrServices: businessInfo.productsOrServices || req.business.productsOrServices,
      location: businessInfo.location || req.business.location,
      address: businessInfo.address || req.business.address
    })
      .then(business => res.status(201).send({
        message: ['This business has been updated successfully', business]
      }));
  }

  /**
   * Takes req and res to return the business object
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} the business object
   */
  static removeBusiness(req, res) {
    return req.business.destroy().then(() => {
      res.status(200).send({
        message: 'This business has been deleted successfully'
      });
    });
  }

  /**
   * Takes req and res to return the business object
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} the business object
   */
  static getBusiness(req, res) {
    const businessId = parseInt(req.params.businessId, 10);

    return Business.findOne({
      where: { id: businessId },
      include: [{ model: Review, as: 'reviews', }],
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
  static getAllBusinesses(req, res) {
    if (req.query.location) {
      return Business.findAll({
        where: { location: req.query.location },
        include: [{ model: Review, as: 'reviews', }],
      }).then((businesses) => {
        if (businesses.length > 0) {
          return res.status(200).send(businesses);
        } return res.status(404).send({
          message: 'There are no businesses yet with this location!'
        });
      });
    } else if (req.query.category) {
      return Business.findAll({
        include: [{ model: Review, as: 'reviews', }]
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
    } return Business.findAll({
      include: [{ model: Review, as: 'reviews', }]
    }).then((businesses) => {
      if (!businesses) {
        return res.status(404).send({
          message: 'There are no businesses yet!'
        });
      } res.status(200).send(businesses);
    });
  }
}

