const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  googleID: {
    type: Number,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: String,
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

async function validatePassword(password) {
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.validatePassword = validatePassword;

module.exports = mongoose.model("User", userSchema);
