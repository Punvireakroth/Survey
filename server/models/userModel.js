const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create a signup static method to use in middleware
// Since we use "this" keyword we will not use => function
userSchema.statics.signup = async function (email, password) {
  // Validate email and strong password

  if (!email || !password) {
    throw Error("All field must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  // If the user already exist throw an Error
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("User already exist");
  }

  // Salt is addtional string to existing password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });

  return user;
};

// Create a login static method to use in middleware
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Can't find this user");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  // check if email and password that have been input by user match any email and password in database
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Invalid credentials");
  }

  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
