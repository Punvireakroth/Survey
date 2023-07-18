const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const {
  getSurveysByUser,
  getSurvey,
  createAndUpdateSurvey,
  updateSurvey,
  saveResponsesToSurvey,
  deleteSurvey,
  getASurvey,
} = require("../controllers/surveyController");

// require auth for all survey
router.use(authMiddleware);

// GET get surveys
router.get("/", getSurvey);

// GET get survey by id
router.get("/:id", getASurvey);

// GET get survey by user
router.get("/surveys-by-user/:id", getSurveysByUser);

// POST create survey or update

router.post("/create-update", createAndUpdateSurvey); // WORK✅

// PUT Update survey

router.put("/update/:id", updateSurvey); // WORK✅

// UPDATE Save Response to the survey

router.put("/update-responses/:id", saveResponsesToSurvey);

// DELETE Delete survey

router.delete("/delete/:id", deleteSurvey);

module.exports = router;
