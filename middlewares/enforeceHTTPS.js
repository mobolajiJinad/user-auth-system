const enforceHttps = (req, res, next) => {
  if (
    req.headers["x-forwarded-proto"] !== "https" &&
    process.env.NODE_ENV === "production"
  ) {
    return res.redirect("https://" + req.hostname + req.url);
  }
  next();
};

module.exports = enforceHttps;
