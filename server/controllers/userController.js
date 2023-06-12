const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// @desc Get the user
// @route GET /users
// @access private ------------------

const getUser = asyncHandler(async (req, res) => {
  const user = await User.find();
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});

// @desc login or register a user
// @route POST /user/login
// @access private ------------------

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email: email }).exec();

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (user) {
    res.status(200).json({ message: "User is already exist" });
  } else {
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    if (newUser) {
      res.status(200).json({
        _id: newUser._id,
        name: name,
        email: email,
        token: generateToken(newUser._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

// @desc login user
// @route POST /user/login
// @access private

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc Update user survey
// @route GET /user/login
// @access private ------------------

const updateUserSurveys = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("No user was found");
  } else if (
    user.surveys.findIndex((survey) => survey === req.body.survey_id)
  ) {
    res.status(200).json({ message: "This survey already existed" });
  } else {
    console.log(req.body.survey_id);
    const newSurveys = [...user.surveys];
    newSurveys.push(req.body.survey_id);
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { surveys: newSurveys }
    );
    res.status(200).json(updatedUser);
  }
});

// @desc Delete user
// @route DELETE /users/delete/:id

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("No user was found");
  }
  await User.deleteOne({ _id: req.params.id });
  const existState = await User.findOne({ _id: req.params.id });
  res.status(200).json({ id: req.params.id, existState });
});

// Generate json web token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  getUser,
  createUser,
  loginUser,
  updateUserSurveys,
  deleteUser,
};
