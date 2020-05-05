const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


/** Creates a new user
 *
 * @param req
 * @param res
*/

exports.signup = (req, res) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });
  
    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
            res.send({ message: "User was registered successfully!" });
          });
  };

 
  
/**Logs in existing user 
 *
 * @param req
 * @param res
*/

  exports.signin = (req, res) => {
    User.findOne({
      email: req.body.email
    })
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        var token = jwt.sign({ id: user.email }, config.secret, {
          expiresIn: 86400 // This token is assigned to the user for 24 hours.
        });
  

        res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          accessToken: token
        });
      });
  };