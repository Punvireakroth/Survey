const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  answer_choice: [String],
  survey_id: String,
  user_id: String,
  responses: [{}],
});

module.exports = mongoose.model("Question", questionSchema);
