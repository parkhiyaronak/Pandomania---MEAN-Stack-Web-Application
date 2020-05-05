const { verifySignUp } = require("../services");
const controller = require("../controller/auth.controller");

//Allowing the CORS policy for this API along with defining the routes for signin and signup

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail
    ],
    controller.signup
  );

  app.post("/signin", controller.signin);

/**
 *  Sending a message if a get command is issued.
 * @param req
 * @param res
 */

app.get("/", (req, res) => {
  res.json({ message: "Welcome to backend application." });
});

};