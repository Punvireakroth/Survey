import { useState, useEffect, useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import uniqid from "uniqid";
import {
  // MultipleChoice,
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
    user_id: "",
  });
  const [questionType, setQuestionType] = useState(1);
  const [showAddQuestionButton, setShowAddQuestionButton] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [editingPreviousSurvey, setEditingPreviousSurvey] = useState(false);
  const { id } = useParams();

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

  // Add more answer for multiple choice questions
  // const addMoreAnswerChoices = (e, id) => {
  //   let questionArray = [...questions];
  //   let questionIndex = questionArray.findIndex(
  //     (question) => id === question._id
  //   );

  //   let answerChoices = questionArray[questionIndex].answer_choices;
  //   answerChoices.push("");
  //   questionArray[questionIndex] = {
  //     ...questionArray[questionIndex],
  //     answer_choices: answerChoices,
  //   };
  //   setQuestions(questionArray);
  // };

  // Remove answer choice from multiple choice question
  // const removeAnswerChoice = (e, id, ansIndex) => {
  //   let questionArray = [...questions];
  //   let questionIndex = questionArray.findIndex(
  //     (question) => id === question._id
  //   );

  //   let answerChoices = questionArray[questionIndex].answer_choices;
  //   answerChoices.splice(ansIndex, 1);
  //   questionArray[questionIndex] = {
  //     ...questionArray[questionIndex],
  //     answer_choices: answerChoices,
  //   };
  //   setQuestions(questionArray);
  // };

  // const onQuestionTypeChange = (e) => {
  //   setQuestionType(Number(e.target.value));
  //   setShowAddQuestionButton(false);
  // };

  // Add question to survey

  const addQuestion = (e) => {
    setShowAddQuestionButton(true);

    if (e.target.value === "1") {
      let questionArray = [...questions];
      questionArray.push({
        type: "short response",
        question: "",
        answer_choices: [],
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

  // Submit survey
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
    const form = questions.map((question, index) => {
      console.log(question.type);
      switch (question.type) {
        // case 1:
        //   return (
        //     <MultipleChoice
        //       key={question._id}
        //       question={question.question}
        //       answerChoices={question.answer_choices}
        //       handleChange={handleQuestionChange}
        //       id={question._id}
        //       removeQuestion={removeQuestion}
        //       addMoreAnswerChoices={addMoreAnswerChoices}
        //     />
        //   );
        case 1:
          return (
            <TrueFalse
              key={question._id}
              question={question.question}
              answerChoices={question.answer_choices}
              handleChange={handleQuestionChange}
              id={question._id}
              removeQuestion={removeQuestion}
            />
          );
        case 2:
          return (
            <ShortResponse
              key={question._id}
              question={question.question}
              handleChange={handleQuestionChange}
              id={question._id}
              removeQuestion={removeQuestion}
            />
          );
        case 3:
          return (
            <Paragraph
              key={question._id}
              question={question.question}
              handleChange={handleQuestionChange}
              id={question._id}
              removeQuestion={removeQuestion}
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
          <option value="2">Multiple Choice</option>
          <option value="3">True/False</option>
          <option value="4">Paragraph Response</option>
        </Form.Select>
      </>
    );

    return { form, chooseQuestionTypeForm };
  };

  const { form, chooseQuestionTypeForm } = makeSurvey();

  return (
    <div className="mb-5">
      <SurveyTitle onChange={handleSurveyChange} survey={survey} />
      {form}
      {showAddQuestionButton === true ? (
        //showAddAndSaveBtns()
        questions.length >= 1 ? (
          <div>
            <Button
              style={{ margin: 10 }}
              variant="success"
              onClick={() => setShowAddQuestionButton(false)}
            >
              Add Question
            </Button>

            <Button variant="info" onClick={onSubmitSurvey}>
              Save and Finish Survey
            </Button>
          </div>
        ) : (
          <Button
            variant="info"
            onClick={() => setShowAddQuestionButton(false)}
          >
            Add Question
          </Button>
        )
      ) : (
        chooseQuestionTypeForm
      )}
    </div>
  );
};

export default CreateSurvey;
