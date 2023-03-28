const express = require("express");

const router = express.Router();

router.route("/").get((req, res) => {
  res.render("dashboard", {
    title: "dashboard",
    user: req.user.username,
    msg: { error: req.flash("error"), success: req.flash("success") },
  });
});

router.route("/logout").get((req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect("/auth/local/login");
  });
});

module.exports = router;
