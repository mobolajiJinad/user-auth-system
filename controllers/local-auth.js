const passport = require("passport");

const User = require("../models/User");

const login = () => {
  return passport.authenticate("local", {
    failureFlash: "You do not have an account",
    failureRedirect: "/auth/signup",
    successRedirect: "/dashboard",
  });
};

const signup = async (req, res, next) => {
  try {
    const { username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      req.flash("error", "Passwords do not match");
      return res.redirect("signup");
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
      req.flash("error", "Username already exists");
      return res.redirect("/auth/local/login");
    }

    // Add password validation
    const passwordRegex =
      /^(?=.*\d)(?=.*[!@_#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,16}$/;
    if (!passwordRegex.test(password)) {
      req.flash(
        "error",
        "Password must be at least 8 characters long and contain at least one letter and one number."
      );
      return res.redirect("signup");
    }

    const user = new User({ username, password });
    await user.save();

    req.flash("success", "You have successfully signed up!");
    res.redirect("/dashboard");
  } catch (err) {
    req.flash("error", "An error occured, try again later");
    return res.redirect("/auth/signup");
  }
};

module.exports = { login, signup };
