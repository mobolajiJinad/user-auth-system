const callbackCtrl = (err, req, res, next) => {
  if (err) {
    req.flash("error", "Sign up failed");
    return res.redirect("/auth/signup");
  }

  res.redirect("/dashboard");
};

module.exports = {
  callbackCtrl,
};
