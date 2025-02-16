const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router({ mergeParams: true });
const ExpressError = require("../utils/ExpressError.js");
const User = require("../models/user.js");
const Listing = require("../models/listing.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

router
  .route("/signup")
  .get(
    // wrapAsync(userController.renderSignupForm)
    userController.renderSignupForm
  )
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  .get(
    // wrapAsync(userController.renderLoginForm)
    userController.renderLoginForm
  )
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    // wrapAsync(userController.login)
    userController.login
  );

  // logout
router.get(
  "/logout",
  // wrapAsync(userController.logout)
  userController.logout
);


module.exports = router;

// // signUp page
// router.get(
//   "/signup",
//   // wrapAsync(userController.renderSignupForm)
//   userController.renderSignupForm
// );

// // signUp post info
// router.post(
//   "/signup",
//   wrapAsync(userController.signup)
// );

// // login page
// router.get(
//   "/login",
//   // wrapAsync(userController.renderLoginForm)
//   userController.renderLoginForm
// );

// // login post info
// router.post(
//   "/login",
//   saveRedirectUrl,
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   // wrapAsync(userController.login)
//   userController.login
// );

// // logout
// router.get(
//   "/logout",
//   // wrapAsync(userController.logout)
//   userController.logout
// );
