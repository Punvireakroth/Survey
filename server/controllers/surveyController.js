const asyncHandler = require("express-async-handler");

// Models
const Survey = require("../models/surveyModel");
const User = require("../models/userModel");

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

const getSurveysByUser = asyncHandler(async (req, res) => {
  // Find all surveys that have been created by specific user
  const user_id = req.user._id;

  const surveys = await Survey.find({ user_id }).sort({ createdAt: -1 });

  if (surveys.length === 0) {
    res.status(404).json("No surveys found");
  } else {
    // Extract necessary data from each survey
    const surveyList = surveys.map((survey) => {
      const responseTotal = survey.questions[0]?.responses?.length || 0;

      return {
        title: survey.title,
        description: survey.description,
        user_id,
        responseTotal,
        _id: survey._id,
      };
    });

    // Send the survey list as the response
    res.status(200).json(surveyList);
  }
});

// @desc Create a new survey
// @route POST api/surveys/create-update
// @access private

const createAndUpdateSurvey = asyncHandler(async (req, res) => {
  // Save user id to assign user id to each user's survey
  const user_id = req.user._id;
  //if not there, the survey must be created
  let findSurvey = await Survey.findById(req.body.survey_id);
  if (findSurvey) {
    //place questions in an array
    let questions = [...req.body.questions];

    //check if questions exist in body
    //if question exists, add responses and array to question
    questions.map((question) => {
      let index = findSurvey.questions.findIndex(
        (findSurveyQuestion) => findSurveyQuestion._id === question._id
      );
      if (index > -1) {
        question.responses = findSurvey.questions[index].responses;
      }
    });

    //send survey to database for updating
    const updatedSurvey = await Survey.findByIdAndUpdate(
      req.body.survey_id,
      {
        questions: questions,
        title: req.body.title,
        description: req.body.description,
      },
      { new: true }
    );
    res.status(200).json(updatedSurvey);
  } else {
    const survey = await Survey.create({
      questions: req.body.questions,
      user_id: user_id,
      title: req.body.title,
      description: req.body.description,
      creationTime: req.body.creationTime,
      _id: req.body.survey_id,
    });
    console.log("survey = " + survey);

    if (survey) {
      res.status(200).json(survey);
    } else {
      res
        .status(402)
        .json(" The survey might have been added to the database though.");
    }
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

//update surveys with responses (It's when the user submits the survey) ✅
//@route put
//@access private
const saveResponsesToSurvey = asyncHandler(async (req, res) => {
  const survey = await Survey.findById(req.params.id);
  if (!survey) {
    res.status(400);
    throw new Error("That Survey was not found.");
  }
  //getting questions and the _id from the body
  const { questions, _id } = req.body;
  //new questions comes from database
  let newQuestions = [...survey.questions];

  newQuestions.forEach((originalQuestion) => {
    //find matching index
    let index = questions.findIndex(
      (submittedQuestion) => submittedQuestion._id === originalQuestion._id
    );
    //push responses onto responses array
    if (!originalQuestion.responses) {
      originalQuestion.responses = [];
    }
    originalQuestion.responses.push(questions[index].response);
  });

  const updatedSurvey = await Survey.findByIdAndUpdate(
    survey._id,
    { questions: newQuestions },
    { new: true }
  );
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
  getSurveysByUser,
  getSurvey,
  createAndUpdateSurvey,
  updateSurvey,
  saveResponsesToSurvey,
  deleteSurvey,
};
