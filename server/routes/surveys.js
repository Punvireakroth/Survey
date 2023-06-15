const express = require("express");

const router = express.Router();

const {
  getSurveysByUser,
  getSurvey,
  createAndUpdateSurvey,
  updateSurvey,
  saveResponsesToSurvey,
  deleteSurvey,
} = require("../controllers/surveyController");

// GET get survey
// Authurized

router.get("/:id", getSurvey); // WORK✅

// GET get survey by user
router.get("/surveys-by-user/:id", getSurveysByUser);

router.get("/public", getSurvey);

// POST create survey or update

router.post("/create-update", createAndUpdateSurvey); // WORK✅

// PUT Update survey

router.put("/update/:id", updateSurvey); // WORK✅

// UPDATE Save Response to the survey

router.put("/update-responses/:id", saveResponsesToSurvey);

// DELETE Delete survey

router.delete("/delete/:id", deleteSurvey);

module.exports = router;
