const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;

const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
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

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:
          "https://squady-user-auth-system.vercel.app/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let email = profile.emails ? profile.emails[0].value : null;

          if (email === null) {
            delete email;
          }

          let user = await User.findOne({ googleID: profile.id });

          if (!user) {
            user = await User.create({
              googleID: profile.id,
              username: profile.displayName,
              ...(email && { email }),
            });
          }
          done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL:
          "https://squady-user-auth-system.vercel.app/auth/facebook/callback",
        profileFields: ["id", "displayName", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let email = profile.emails ? profile.emails[0].value : null;

          if (email === null) {
            delete email;
          }

          let user = await User.findOne({ facebookID: profile.id });

          if (!user) {
            user = await User.create({
              facebookID: profile.id,
              username: profile.displayName,
              ...(email && { email }),
            });
          }
          done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CLIENT_ID,
        consumerSecret: process.env.TWITTER_CLIENT_ID,
        callbackURL:
          "https://squady-user-auth-system.vercel.app/auth/twitter/callback",
      },
      async (token, tokenSecret, profile, done) => {
        try {
          let email = profile.emails ? profile.emails[0].value : null;

          if (email === null) {
            delete email;
          }

          const user = User.findById(profile.id);

          if (!user) {
            await User.create({
              _id: profile.id,
              username: profile.displayName,
              ...(email && { email }),
            });
          }

          done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);

      if (user) {
        done(null, user);
      }
    } catch (err) {
      done(err);
    }
  });
};
