const db = require("../models");
const User = db.user;

/**
 * Checking for duplciate email in mongodb
 * @param req
 * @param res
 * @param next
 */

checkDuplicateUsernameOrEmail = (req, res, next) => {
  
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  };


  const verifySignUp = {
    checkDuplicateUsernameOrEmail
 };

  module.exports = verifySignUp;