module.exports = {
  isAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error", "You are not logged in.");
    res.redirect("/auth/local/login");
  },
  isGuest: function (req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/dashboard");
    }
    next();
  },
};
