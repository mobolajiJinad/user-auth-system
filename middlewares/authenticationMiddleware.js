module.exports = function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    req.flash("error", "You are not logged in.");
    return next();
  }
  res.redirect("/login");
};
