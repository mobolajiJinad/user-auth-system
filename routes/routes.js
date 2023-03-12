const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/User");
const isAuthenticated = require("../middlewares/authenticationMiddleware");

router.route("/").get((req, res) => {
  res.redirect("/login");
});

router
  .route("/login")
  .get((req, res) => {
    res.render("login", {
      title: "Log in page",
      msg: req.flash("error"),
    });
  })
  .post((req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        req.flash("error", info.msg);
        return res.redirect("/login");
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect("/dashboard");
      });
    })(req, res, next);
  });

router
  .route("/signup")
  .get((req, res) => {
    res.render("signup", {
      title: "Sign up page",
      msg: { error: req.flash("error"), success: req.flash("success") },
    });
  })
  .post(async (req, res, next) => {
    try {
      const { username, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        req.flash("error", "Passwords do not match");
        return res.redirect("/signup");
      }

      const userExists = await User.findOne({ username });
      if (userExists) {
        req.flash("error", "Username already exists");
        return res.redirect("/signup");
      }

      // Add password validation
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(password)) {
        req.flash(
          "error",
          "Password must be at least 8 characters long and contain at least one letter and one number."
        );
        return res.redirect("/signup");
      }

      const user = new User({ username, password });
      await user.save();

      req.flash("success", "You have successfully signed up!");
      res.redirect("/dashboard");
    } catch (err) {
      console.log(err);
    }
  });

router.get("/dashboard", isAuthenticated, (req, res) => {
  res.render("dashboard", {
    title: dashboard,
  });
});
module.exports = router;
