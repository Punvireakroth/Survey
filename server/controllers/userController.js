const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// @desc Get the user
// @route GET /users
// @access private ------------------

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.id });
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});

// @desc login or register a user
// @route GET /users/login
// @access private ------------------

const loginOrCreateUser = asyncHandler(async (req, res) => {
  const { name, email, _id } = req.body;
  const user = await User.findOne({ email: email }).exec();
  if (user) {
    res.status(200).json(user);
  } else {
    const newUser = await User.create({
      name: name,
      email: email,
      _id: _id,
    });
    if (newUser) {
      res.status(200).json({
        _id: id,
        name: name,
        email: email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

// @desc Update user survey
// @route GET /users/login
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


// Generate 

module.exports = { getUser, loginOrCreateUser, updateUserSurveys, deleteUser };
