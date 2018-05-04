/**
 * @fileOverview this JS file contains logic for user's APIs logic
 *
 * @author  Victor Ukafor
 * @requires  NPM:jsonwebtoken
 * @requires  NPM:bcrypt
 * @version 1.0.0
 *
 */


/**
 * A class to represents users controller
 * @class
 */
export default class UsersController {
  /**
   * @constructor
   * @param {object} User
   * @param {object} bcrypt
   * @param {object} jwt
   * @param {object} config
   */
  constructor(User, bcrypt, jwt, config) {
    this.User = User;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    this.config = config;
    this.postUser = this.postUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }


  /**
   * Takes req and res to return the user object
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} the user object
   */
  postUser(req, res) {
    const { body: userInfo } = req;
    const salt = this.bcrypt.genSaltSync(10);

    this.User.create({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      password: this.bcrypt.hashSync(userInfo.password, salt),
    }).then((user) => {
      const token = this.jwt.sign({ id: user.id }, this.config.secret, { expiresIn: 60 * 60 });
      res.status(201).send({ user, authenticated: true, token });
    }).catch(() => res.status(500));
  }


  /**
   * Takes req and res to return the user object
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} the user object
   */
  loginUser(req, res) {
    const { body: userInfo } = req;

    if (userInfo.email && userInfo.password) {
      this.User.findOne({ where: { email: userInfo.email } }).then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'Invalid email or password!'
          });
        } else if (!this.bcrypt.compareSync(userInfo.password, user.password)) {
          return res.status(404).send({ message: 'Invalid email or password!' });
        } else if (user) {
          const token = this.jwt.sign({ id: user.id }, this.config.secret, { expiresIn: 60 * 60 });

          return res.status(200).send({
            message: `Welcome! ${user.firstName} ${user.lastName}`,
            authenticated: true,
            token
          });
        }
      });
    } else {
      return res.status(400).send({
        message: 'Both fields must be filled'
      });
    }
  }


//   static getUserDetails(req, res) {

//     User.findOne({
//       where: { id: req.user.id },
//       include: [{ model: Business, as: 'businesses', }],
//     }).then((user) => {
//       if (!user) {
//         res.status(404).send({ message: 'User can not be found!' });
//       } else {
//         res.status(200).send({
//           id: user.id,
//           firstName: user.firstName,
//           lastName: user.lastName,
//           Email: user.email,
//           Businesses: user.businesses
//         });
//       }
//     });
//   }

//   static updateUserDetails(req, res) {
//     req.user.update({
//       firstName: req.body.firstName || req.user.firstName,
//       lastName: req.body.lastName || req.user.lastName,
//     }).then((user) => {
//       res.status(201).send({
//         message: ['User has been updated successfully', {
//           id: user.id,
//           firstName: user.firstName,
//           lastName: user.lastName,
//           Email: user.email,
//         }]
//       });
//     }).catch((error) => { res.status(500); });
// }


// static passwordReset(req, res) {
//   if(!req.body.password){
//     res.status().send.
//   }
//   req.user.update({
//     password: req.body.password,
//   }).then((user) => {
//     res.status(201).send({
//       message: 'Your password has been reset successfully!'
//     }); }).catch((error) => { res.status(500); });
// }
}
