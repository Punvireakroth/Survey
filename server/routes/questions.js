const express = require("express");

const {
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");

// express router
const router = express.Router();

// GET get question
router.get("/", getQuestion);

// POST create a question
router.post("/create", createQuestion);

// PUT Edit a question
router.put("/update/:id", updateQuestion);

// DELETE delete a question
router.delete("/delete/:id", deleteQuestion);

module.exports = router;
