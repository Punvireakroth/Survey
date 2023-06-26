import { useState, useEffect, useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import uniqid from "uniqid";
import {
  Paragraph,
  ShortResponse,
  TrueFalse,
  SurveyTitle,
} from "./createQuestionComponents";

import { useParams } from "react-router-dom";

const CreateSurvey = (props) => {
  const [survey, setSurvey] = useState({
    title: "",
    description: "",
    questions: [],
  });
  const [questionType, setQuestionType] = useState(1);
  const [showAddQuestionButton, setShowAddQuestionButton] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [editingPreviousSurvey, setEditingPreviousSurvey] = useState(false);
  const { id } = useParams();

  // Rest of the code...

  // Get Survey
  const callApiToGetSurvey = useCallback(async (url, fetchOptions) => {
    try {
      const response = await fetch(url, fetchOptions);
      const responseData = await response.json();

      let questions = responseData.questions.map((question) => {
        return {
          _id: question._id,
          type: question.type,
          question: question.question,
          answer_choices: question.answer_choices,
        };
      });

      let updatedSurvey = {
        _id: responseData._id,
        questions: [],
        title: responseData.title,
        description: responseData.description,
        user_id: responseData.user_id,
      };

      setSurvey(updatedSurvey);
      setQuestions(questions);
    } catch (e) {
      console.log(e.error);
    }
  }, []);

  const startSurvey = () => {
    if (id) {
      callApiToGetSurvey(`/api/surveys/${id}`, { method: "GET" });
      setEditingPreviousSurvey(true);
    } else {
      setSurvey({ ...survey, _id: uniqid("survey-") });
    }
  };

  useEffect(() => {
    startSurvey();
  }, []);

  // Update data based on the user input
  const handleSurveyChange = (e) => {
    let surveyObject = {
      ...survey,
    };
    surveyObject[e.target.name] = e.target.value;
    setSurvey(surveyObject);
  };

  const handleQuestionChange = (e, questionIndex) => {
    let questionArray = [...questions];

    if (e.target.getAttribute("answer") === "yes") {
      let answerChoices = questionArray[questionIndex].answer_choices;
      answerChoices[e.target.getAttribute("answernum")] = e.target.value;

      questionArray[questionIndex] = {
        ...questionArray[questionIndex],
        answer_choices: answerChoices,
      };
    } else {
      questionArray[questionIndex] = {
        ...questionArray[questionIndex],
        question: e.target.value,
      };
    }

    setQuestions(questionArray);
  };

  // Add more answer for multiple choice questions
  const addMoreAnswerChoices = (e, id) => {
    let questionArray = [...questions];
    let questionIndex = questionArray.findIndex(
      (question) => id === question._id
    );
    let answerChoices = questionArray[questionIndex].answer_choices;
    answerChoices.push("");
    questionArray[questionIndex] = {
      ...questionArray[questionIndex],
      answer_choices: answerChoices,
    };
    setQuestions(questionArray);
  };

  // Remove answer choice from multiple choice question
  const removeAnswerChoice = (e, id, ansIndex) => {
    let questionArray = [...questions];
    let questionIndex = questionArray.findIndex(
      (question) => id === question._id
    );

    let answerChoices = questionArray[questionIndex].answer_choices;
    answerChoices.splice(ansIndex, 1);
    questionArray[questionIndex] = {
      ...questionArray[questionIndex],
      answer_choices: answerChoices,
    };
    setQuestions(questionArray);
  };

  const onQuestionTypeChange = (e) => {
    setQuestionType(Number(e.target.value));
    setShowAddQuestionButton(false);
  };

  // Add question to survey

  const addQuestion = (e) => {
    setShowAddQuestionButton(true);

    if (e.target.value === "1") {
      let questionArray = [...questions];
      questionArray.push({
        type: "short response",
        question: "",
        answer_choices: [],
        _id: uniqid("question-"),
        responses: [],
      });
      setQuestions(questionArray);
    } else if (e.target.value === "2") {
      let questionArray = [...questions];
      questionArray.push({
        type: "true/false",
        question: "",
        answer_choices: ["True", "False"],
        _id: uniqid("question-"),
        responses: [],
      });
      setQuestions(questionArray);
    } else if (e.target.value === "3") {
      let questionArray = [...questions];
      questionArray.push({
        type: "paragraph",
        question: "",
        answer_choices: [],
        _id: uniqid("question-"),
        responses: [],
      });
      setQuestions(questionArray);
    }
  };

  // Remove question from survey
  const removeQuestion = (e, id) => {
    let questionArray = [...questions];
    let questionIndex = questionArray.findIndex(
      (question) => id === question._id
    );

    questionArray.splice(questionIndex, 1);
    setQuestions(questionArray);
  };

  const onSubmitSurvey = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/surveys/create-update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questions: questions.map((question) => ({
            type: question.type,
            question: question.question,
            answer_choices: question.answer_choices,
          })),
          title: survey.title,
          description: survey.description,
          creationTime: new Date(),
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        props.sendSurveyId(responseData._id);
        window.open(`/display-survey/${responseData._id}`, "_blank");
      } else {
        console.log("Survey submission failed. Please try again.");
      }
    } catch (error) {
      console.log("An error occurred while submitting the survey:", error);
    }
  };

  const makeSurvey = () => {
    const form = questions.map((question, index) => {
      console.log(question.type);
      switch (question.type) {
        // ...
        case "true/false":
          return (
            <TrueFalse
              key={question._id}
              question={question}
              answerChoices={addMoreAnswerChoices}
              onChange={(e) => handleQuestionChange(e, index)} // Pass the question index to handleQuestionChange
              id={question._id}
              removeQuestion={removeQuestion}
              index={index}
            />
          );
        case "short response":
          return (
            <ShortResponse
              key={question._id}
              question={question.question}
              onChange={(e) => handleQuestionChange(e, index)} // Pass the question index to handleQuestionChange
              id={question._id}
              removeQuestion={removeQuestion}
              index={index}
            />
          );
        case "paragraph":
          return (
            <Paragraph
              key={question._id}
              question={question.question}
              onChange={(e) => handleQuestionChange(e, index)} // Pass the question index to handleQuestionChange
              id={question._id}
              removeQuestion={removeQuestion}
              index={index}
            />
          );
        default:
          return null;
      }
    });
    const chooseQuestionTypeForm = (
      <>
        <h4>Choose a Question Type</h4>
        <Form.Select
          size="small"
          aria-label="Select Question Type"
          onChange={addQuestion}
        >
          <option></option>
          <option value="1">Short Response</option>
          <option value="2">True/False</option>
          <option value="3">Paragraph</option>
        </Form.Select>
      </>
    );

    return { form, chooseQuestionTypeForm };
  };

  const { form, chooseQuestionTypeForm } = makeSurvey();

  return (
    <div className="mb-5">
      <SurveyTitle onChange={handleSurveyChange} survey={survey} />
      <hr
        style={{
          marginTop: 30,
          borderBottomStyle: "none",
          borderTopStyle: "dotted",
          width: 20 + "%",
          margin: 0 + " auto",
          borderWidth: 9 + "px",
          borderColor: "#42a4c4",
        }}
      />
      {form}
      {showAddQuestionButton === true ? (
        //showAddAndSaveBtns()
        questions.length >= 1 ? (
          <div>
            <Button
              className="m-2"
              variant="success"
              onClick={() => setShowAddQuestionButton(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                paddingTop: 7,
                paddingBottom: 7,
                paddingLeft: 30,
                paddingRight: 30,
                borderRadius: 50,
                color: "#ffffff",
                borderWidth: 2.9,
                marginTop: 40,
                marginBottom: 40 + "px",
              }}
            >
              Add Question
            </Button>

            <Button
              className="m-2"
              variant="info"
              onClick={onSubmitSurvey}
              style={{
                display: "inline-flex",
                alignItems: "center",
                backgroundColor: "#ffffff",
                paddingTop: 7,
                paddingBottom: 7,
                paddingLeft: 50,
                paddingRight: 50,
                borderRadius: 50,
                color: "#ffffff",
                borderColor: "#0c66a9 ",
                backgroundColor: "#0c66a9 ",
                borderWidth: 2.9,
                marginTop: 40,
                marginBottom: 40 + "px",
              }}
            >
              Save and Finish Survey
            </Button>
          </div>
        ) : (
          <Button
            className="m-2"
            variant="info"
            onClick={() => setShowAddQuestionButton(false)}
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#ffffff",
              paddingTop: 7,
              paddingBottom: 7,
              paddingLeft: 50,
              paddingRight: 50,
              borderRadius: 50,
              color: "#ffffff",
              borderColor: "#0c66a9 ",
              backgroundColor: "#0c66a9 ",
              borderWidth: 2.9,
              marginTop: 40,
              marginBottom: 40 + "px",
            }}
          >
            Add Question
          </Button>
        )
      ) : (
        chooseQuestionTypeForm
      )}
      <br />
      <br />
    </div>
  );
};

export default CreateSurvey;
