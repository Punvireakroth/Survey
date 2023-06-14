import { useState, useEffect, useCallback } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import uniqid from "uniqid";
import {
  MultipleChoice,
  Paragraph,
  ShortResponse,
  TrueFalse,
  SurveyTitle,
} from "./createQuestionComponents";

import { useNavigate, useParams } from "react-router-dom";

const CreateSurvey = (props) => {
  const [survey, setSurvey] = useState({
    title: "",
    description: "",
    questions: [],
    user_id: "",
  });
  const [questionType, setQuestionType] = useState(1);
  const [showAddQuestionButton, setShowAddQuestionButton] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [editingPreviousSurvey, setEditingPreviousSurvey] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Get Survey
  const callApiToGetSurvey = useCallback(async (url, fetchOptions) => {
    try {
      const response = await fetch(url, fetchOptions);
      const responseData = await response.json();

      let questions = [];
      responseData.questions.forEach((question) => {
        let newQuestion = {
          _id: question._id,
          type: question.type,
          question: question.question,
          answer_choice: question.answer_choices,
        };
        questions.push(newQuestion);
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
  });

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

  const handleQuestionChange = (e) => {
    let questionArray = [...questions];
    let questionIndex = questionArray.findIndex(
      (question) => e.target.id === question._id
    );
    if (e.target.getAttribute("answer") === "yes") {
      let answerChoices = questionArray[questionIndex].answer_choices;
      answerChoices[e.target.getAttribute("answernum")] = e.target.value;

      questionArray[questionIndex] = {
        ...questionArray[questionIndex],
        answer_choices: answerChoices,
      };
      setQuestions(questionArray);
    } else {
      questionArray[questionIndex] = {
        ...questionArray[questionIndex],
        question: e.target.value,
      };
      setQuestions(questionArray);
    }
  };

  // Add more answer for multiplechoice questions
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

  // Add question to the survey
  const addQuestion = (e) => {
    setShowAddQuestionButton(true);
    let newQuestion = {
      _id: uniqid("question-"),
      type: questionType,
      question: "",
      answer_choices: [],
    };
    setQuestions([...questions, newQuestion]);
  };

  // Delete question
  const deleteQuestion = (e, id) => {
    let questionArray = [...questions];
    let questionIndex = questionArray.findIndex(
      (question) => id === question._id
    );
    questionArray.splice(questionIndex, 1);
    setQuestions(questionArray);
  };

  // change question type
  const handleQuestionTypeChange = (e) => {
    setQuestionType(parseInt(e.target.value));
    setShowAddQuestionButton(false);
  };

  // When click on submit to create a new suevey
  const onSubmitSurvey = (e) => {
    e.preventDefault();

    fetch("/api/surveys/create-update", {
      method: "POST",
      body: JSON.stringify({
        questions: questions,
        title: survey.title,
        description: survey.description,
        user_id: survey.user_id,
        creationTime: new Date(),
        survey_id: survey._id,
      }),
    });

    props.sendSurveyId(survey._id);
    window.open(`/display-survey/${survey._id}`, "_blank");
  };

  const makeSurvey = () => {
    let surveyComponents = [];
    for (let i = 0; i < questions.length; i++) {
      let question = questions[i];
      if (question.type === 1) {
        surveyComponents.push(
          <MultipleChoice
            key={question._id}
            question={question.question}
            answerChoices={question.answer_choices}
            handleChange={handleQuestionChange}
            id={question._id}
            deleteQuestion={deleteQuestion}
            addMoreAnswerChoices={addMoreAnswerChoices}
          />
        );
      } else if (question.type === 2) {
        surveyComponents.push(
          <TrueFalse
            key={question._id}
            question={question.question}
            answerChoices={question.answer_choices}
            handleChange={handleQuestionChange}
            id={question._id}
            deleteQuestion={deleteQuestion}
          />
        );
      } else if (question.type === 3) {
        surveyComponents.push(
          <ShortResponse
            key={question._id}
            question={question.question}
            handleChange={handleQuestionChange}
            id={question._id}
            deleteQuestion={deleteQuestion}
          />
        );
      } else if (question.type === 4) {
        surveyComponents.push(
          <Paragraph
            key={question._id}
            question={question.question}
            handleChange={handleQuestionChange}
            id={question._id}
            deleteQuestion={deleteQuestion}
          />
        );
      }
    }
    return surveyComponents;
  };

  let displayedSurveyCreator = makeSurvey();

  return (
    <Container className="mb-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2>Create Survey</h2>
          {editingPreviousSurvey && (
            <div className="alert alert-info">
              You edit the previos saved survey
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CreateSurvey;
