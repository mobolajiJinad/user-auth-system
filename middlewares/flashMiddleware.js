function flashMiddleware(req, res, next) {
  res.locals.messages = req.flash();
  next();
}

module.exports = flashMiddleware;
