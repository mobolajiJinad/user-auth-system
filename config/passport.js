const passport = require("passport");
const Strategy = require("passport-local").Strategy;

const User = require("../models/User");

passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return done(null, false, { msg: "Invalid credentials" });
      }

      const isValidPassword = await user.validatePassword(password);

      if (isValidPassword) {
        return done(null, user);
      } else {
        return done(null, false, { msg: "Invalid credentials" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);

    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
