const asyncHandler = require("express-async-handler");

// Models
const Survey = require("../models/surveyModel");

// @desc Get specific the surveys
// @route GET api/surveys/:id
// @access private and public ------------------

const getSurvey = asyncHandler(async (req, res) => {
  const survey = await Survey.findById(req.params.id);
  res.status(200).json(survey);
});

// @desc Get all the surveys
// @route GET api/surveys/public
// @access private and public ------------------

const getAllSurvey = asyncHandler(async (req, res) => {
  const surveys = await Survey.find({});
  res.status(200).json(surveys);
});

// @desc Create a new survey
// @route POST api/surveys/create-update
// @access private

const createAndUpdateSurvey = asyncHandler(async (req, res) => {
  // Check for existing survey if exist => UPDATE : if not => CREAT
  const surveyId = req.body.survey_id;
  const existingSurvey = await Survey.findById(surveyId);

  if (existingSurvey) {
    // If it exist UPDATE it
    const updatedSurvey = await Survey.findByIdAndUpdate(surveyId, req.body, {
      new: true,
    });
    res.status(200).json(updatedSurvey);
  } else {
    // If it not exist, create it
    const newSurvey = await Survey.create(req.body);
    res.status(200).json(newSurvey);
  }
});

// @desc Update a survey
// @route PUT api/surveys/update
// @access private

const updateSurvey = asyncHandler(async (req, res) => {
  const survey = await Survey.findById(req.params.id);

  if (!survey) {
    res.status(400);
    throw new Error("Survey not found:(");
  }

  const updatedSurvey = await Survey.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedSurvey);
});

// @desc Saving responses to a survey
// @route PUT api/surveys/update-responses/:id
// @access private

const saveResponsesToSurvey = asyncHandler(async (req, res) => {
  const surveyId = req.params.id;
  const { questions } = req.body;

  const updatedSurvey = await Survey.findByIdAndUpdate(
    surveyId,
    {
      $push: {
        "questions.$[].responses": { $each: questions.map((q) => q.response) },
      },
    },
    { new: true }
  );

  if (!updatedSurvey) {
    res.status(400);
    throw new Error("That Survey was not found.");
  }

  res.status(200).json(updatedSurvey);
});

// @desc Delete Survey
// @route PUT api/surveys/delete/:id
// @access private

const deleteSurvey = asyncHandler(async (req, res) => {
  const survey = await Survey.findById(req.params.id);
  if (!survey) {
    res.status(400);
    throw new Error("That survey was not found!");
  }
  await Survey.deleteOne({ _id: req.params.id });
  const existState = await Survey.findOne({ _id: req.params.id });
  res.status(200).json({ id: req.params.id, exists: existState });
});

module.exports = {
  getAllSurvey,
  getSurvey,
  createAndUpdateSurvey,
  updateSurvey,
  saveResponsesToSurvey,
  deleteSurvey,
};
