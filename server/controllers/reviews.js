/**
 * @fileOverview this JS file contains logic for review's APIs logic
 *
 * @author  Victor Ukafor
 * @version 1.0.0
 *
 */

import { Review } from '../models';

/**
 * A class to represents reviews controller
 * @class
 */
export default class ReviewsController {
  /**
   * Takes req and res to return the review object
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} the review object
   */
  static postReview(req, res) {
    if (!req.body.reviewBody) {
      return res.status(400).send({
        message: 'You must enter a review for this business!'
      });
    }
    Review.create({
      businessId: req.business.id,
      name: `${req.user.firstName} ${req.user.lastName}`,
      email: req.user.email,
      reviewBody: req.body.reviewBody,
    }).then(review => res.status(201).send({
      message: ['A review has been added for this business', review]
    })).catch(() => res.status(500));
  }

  /**
   * Takes req and res to return the review object
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} the review object
   */
  static getReviews(req, res) {
    const businessId = parseInt(req.params.businessId, 10);

    Review.findAll({ where: { businessId } }).then((reviews) => {
      if (reviews.length === 0) {
        return res.status(404).send({
          message: 'There are no reviews for this businesses yet!'
        });
      }
      return res.status(200).send(reviews);
    });
  }
}

