import { useState, useEffect, useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import uniqid from "uniqid";
import {
  Paragraph,
  ShortResponse,
  TrueFalse,
  SurveyTitle,
} from "./createQuestionComponents";

import { useParams, useNavigate } from "react-router-dom";

const CreateSurvey = (props) => {
  const [survey, setSurvey] = useState({
    title: "",
    description: "",
    questions: [],
  });
  const [showAddQuestionButton, setShowAddQuestionButton] = useState(true);
  const [editingPreviousSurvey, setEditingPreviousSurvey] = useState(false);
  const [questions, setQuestions] = useState([]);
  const { id } = useParams();

  const Navigate = useNavigate();

  // Get Survey
  const callApiToGetSurvey = useCallback(async (url, fetchOptions) => {
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        ...fetchOptions,
      });

      const responseData = await response.json();

      // Update survey state with fetched survey data
      setSurvey(responseData);

      // Update questions state
      setQuestions(responseData.questions);
    } catch (error) {
      console.log("An error occurred while fetching the survey:", error);
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
  }, [id]);

  // Update data based on the user input
  const handleSurveyChange = (e) => {
    setSurvey((prevSurvey) => ({
      ...prevSurvey,
      [e.target.name]: e.target.value,
    }));
  };

  const handleQuestionChange = (e, questionIndex) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        question: e.target.value,
      };
      return updatedQuestions;
    });
  };

  // Add more answer for multiple choice questions
  const addMoreAnswerChoices = (e, questionIndex) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      const answerChoices = updatedQuestions[questionIndex].answer_choices;
      answerChoices.push("");
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        answer_choices: answerChoices,
      };
      return updatedQuestions;
    });
  };

  // Add question to survey
  const addQuestion = (e) => {
    setShowAddQuestionButton(true);
    const questionType = e.target.value;

    setQuestions((prevQuestions) => {
      let updatedQuestions = [...prevQuestions];

      if (questionType === "1") {
        updatedQuestions.push({
          type: "short response",
          question: "",
          answer_choices: [],
          _id: uniqid("question-"),
          responses: [],
        });
      } else if (questionType === "2") {
        updatedQuestions.push({
          type: "true/false",
          question: "",
          answer_choices: ["True", "False"],
          _id: uniqid("question-"),
          responses: [],
        });
      } else if (questionType === "3") {
        updatedQuestions.push({
          type: "paragraph",
          question: "",
          answer_choices: [],
          _id: uniqid("question-"),
          responses: [],
        });
      }

      return updatedQuestions;
    });
  };

  // Remove question from survey
  const removeQuestion = (questionIndex) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions.splice(questionIndex, 1);
      return updatedQuestions;
    });
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
          questions: questions,
          title: survey.title,
          description: survey.description,
          creationTime: new Date(),
          survey_id: survey._id,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        props.sendSurveyId(responseData._id);
        Navigate(`/dashboard`);
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
      switch (question.type) {
        case "true/false":
          return (
            <TrueFalse
              key={question._id}
              question={question}
              answerChoices={addMoreAnswerChoices}
              onChange={(e) => handleQuestionChange(e, index)}
              id={question._id}
              removeQuestion={() => removeQuestion(index)}
              index={index}
            />
          );
        case "short response":
          return (
            <ShortResponse
              key={question._id}
              question={question}
              onChange={(e) => handleQuestionChange(e, index)}
              id={question._id}
              removeQuestion={() => removeQuestion(index)}
              index={index}
            />
          );
        case "paragraph":
          return (
            <Paragraph
              key={question._id}
              question={question}
              onChange={(e) => handleQuestionChange(e, index)}
              id={question._id}
              removeQuestion={() => removeQuestion(index)}
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
                borderColor: "#0c66a9",
                backgroundColor: "#0c66a9",
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
              borderColor: "#0c66a9",
              backgroundColor: "#0c66a9",
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
