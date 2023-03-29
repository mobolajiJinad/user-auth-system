const express = require("express");
const passport = require("passport");
const { signup, login } = require("../controllers/local-auth");
const { callbackCtrl } = require("../controllers/google-auth");

const router = express.Router();

router
  .route("/signup")
  .get((req, res) => {
    res.render("signup", {
      title: "Sign up page",
      msg: { error: req.flash("error"), success: req.flash("success") },
    });
  })
  .post(signup);

router
  .route("/local/login")
  .get((req, res) => {
    res.render("login", {
      title: "Log in page",
      msg: { error: req.flash("error"), success: req.flash("success") },
    });
  })
  .post(login);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureFlash: "Failed to sign up with google",
  }),
  callbackCtrl
);

module.exports = router;
