const asyncHandler = require("express-async-handler");

// Models
const Question = require("../models/questionModel");

// @desc Get all the questions
// @route GET api/guestions
// @access private ------------------
const getQuestion = asyncHandler(async (req, res) => {
  const questions = await Question.find({ id: req.body.id });
  res.status(200).json(questions);
});

// @desc Create new question
// @route POST api/guestions/create
// @access private ------------------
const createQuestion = asyncHandler(async (req, res) => {
  // const questions = JSON.parse(req.body.questions);

  // for (let i = 0; i < questions.length; i++) {
  //   let addedQuestion = await Question.create(question);
  // }

  const questions = Array.isArray(req.body) ? req.body : [req.body];

  const createdQuestions = await Question.create(questions);

  res.status(200).json(createdQuestions);
});

// @desc Update a question
// @route PUT api/guestions/update
// @access private ------------------
const updateQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question) {
    res.status(400);
    throw new Error("Question not found");
  }
  const updatedQuestion = await Question.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedQuestion);
});

// @desc Delete a question
// @route Delete api/guestions/delete
// @access private ------------------
const deleteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question) {
    res.status(400);
    throw new Error("Question not found");
  }
  await Question.deleteOne({ _id: req.params.id });
  const existState = await Question.findOne({ _id: req.params.id });
  res.status(200).json({ id: req.params.id, exists: existState });
});

module.exports = {
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
