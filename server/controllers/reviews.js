import { Review } from '../models';


export default class ReviewsController {
  static postReview(req, res) {
    if (!req.body.reviewBody) {
      return res.status(400).send({
        message: 'You must enter a review for this business!'
      });
    }
    return Review.create({
      businessId: req.business.id,
      name: `${req.user.firstName} ${req.user.lastName}`,
      email: req.user.email,
      reviewBody: req.body.reviewBody,
    }).then(review => res.status(201).send({
      message: ['A review has been added for this business', review]
    })).catch(error => res.status(500).send(error));
  }

  static getReviews(req, res) {
    const businessId = parseInt(req.params.businessId, 10);

    Review.findAll({ where: { businessId } }).then((reviews) => {
      if (reviews.length === 0) {
        res.status(404).send({ message: 'There are no reviews for this businesses yet!' });
      } else {
        res.status(200).send(reviews);
      }
    }).catch((error) => { res.status(500).send(error); });
  }
}

