const mongoose = require("mongoose");

const surveySchema = mongoose.Schema({
  questions: {
    type: [{}],
    required: true,
  },
  title: {
    type: String,
  },
  descriptions: {
    type: String,
  },
  // user_id: {
  //   type: String,
  //   required: true,
  // },
  creationTime: {
    type: String,
  },
  _id: { type: String },
});

module.exports = mongoose.model("Survey", surveySchema);
