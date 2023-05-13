const express = require("express");
const passport = require("passport");
const { signup, login } = require("../controllers/local-auth");

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
    failureFlash: "Failed to continue with google",
    failureRedirect: "/auth/signup",
  }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureFlash: "Failed to continue with facebook",
    failureRedirect: "/auth/signup",
  }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

router.get("/twitter", passport.authenticate("twitter"));

router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    failureFlash: "Failed to continue with twitter",
    failureRedirect: "/auth/signup",
  }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

module.exports = router;
