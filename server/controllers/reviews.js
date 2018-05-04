/**
 * @fileOverview this JS file contains logic for review's APIs logic
 *
 * @author  Victor Ukafor
 * @version 1.0.0
 *
 */

/**
 * A class to represents reviews controller
 * @class
 */
export default class ReviewsController {
  /**
   * @constructor
   * @param {object} Review
   */
  constructor(Review) {
    this.Review = Review;
    this.postReview = this.postReview.bind(this);
    this.getReviews = this.getReviews.bind(this);
  }
  /**
   * Takes req and res to return the review object
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} the review object
   */
  postReview(req, res) {
    if (!req.body.reviewBody) {
      return res.status(400).send({
        message: 'You must enter a review for this business!'
      });
    }
    this.Review.create({
      businessId: req.business.id,
      name: `${req.user.firstName} ${req.user.lastName}`,
      email: req.user.email,
      reviewBody: req.body.reviewBody,
    }).then(review => res.status(201).send({
      message: ['A review has been added for this business', review]
    }));
  }

  /**
   * Takes req and res to return the review object
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} the review object
   */
  getReviews(req, res) {
    const businessId = parseInt(req.params.businessId, 10);

    this.Review.findAll({ where: { businessId } }).then((reviews) => {
      if (!reviews.length) {
        return res.status(404).send({
          message: 'There are no reviews for this businesses yet!'
        });
      } return res.status(200).send(reviews);
    });
  }
}

