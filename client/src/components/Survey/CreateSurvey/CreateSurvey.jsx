import { useState, useEffect, useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import uniqid from "uniqid";
import {
  Paragraph,
  ShortResponse,
  TrueFalse,
  NewSection,
  SurveyTitle,
  ConditionalQuestion,
} from "./createQuestionComponents";

import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";

const CreateSurvey = (props) => {
  const [survey, setSurvey] = useState({
    title: "",
    description: "",
    questions: [],
    user_id: "",
  });
  const [showAddQuestionButton, setShowAddQuestionButton] = useState(true);
  const [editingPreviousSurvey, setEditingPreviousSurvey] = useState(false);
  const [questions, setQuestions] = useState([]);
  const { id } = useParams();

  const Navigate = useNavigate();
  const { user } = useAuthContext();

  // Get Survey
  const callApiToGetSurvey = useCallback(async (url, fetchOptions) => {
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
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
  });

  const startSurvey = () => {
    if (id) {
      callApiToGetSurvey(`https://survey-api-dj9k.onrender.com/api/surveys/${id}`, { method: "GET", mode: 'no-cors', });
      setEditingPreviousSurvey(true);
    } else {
      setSurvey({ ...survey, _id: uniqid("survey-"), user_id: user.token });
    }
  };

  useEffect(() => {
    if (user) {
      let updatedSurvey = { ...survey, user_id: user.token };
      setSurvey(updatedSurvey);
    }
  }, [user]);

  useEffect(() => {
    startSurvey();
  }, [user]);

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
      } else if (questionType === "4") {
        updatedQuestions.push({
          type: "new section",
          question: "",
        });
      } else if (questionType === "5") {
        updatedQuestions.push({
          type: "conditional",
          question: "",
          answer_choices: ["True", "False"],
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
      if (!user) {
        return;
      }
      const response = await fetch("https://survey-api-dj9k.onrender.com/api/surveys/create-update", {
        method: "POST",
        mode: 'no-cors',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          questions: questions,
          title: survey.title,
          description: survey.description,
          user_id: survey.user_id,
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
    // Question index couting (Start from -1 because when I start from 0 the first question is question number 2)
    let questionIndex = -1;

    const form = questions.map((question, index) => {
      // check if question is a new section skip question index
      if (question.type === "new section") {
        // For section type, render the text without counting
        return (
          <NewSection
            id={question._id}
            key={question._id}
            question={question}
            onChange={(e) => handleQuestionChange(e, index)}
            removeQuestion={() => removeQuestion(index)}
          />
        );
      }
      // For other question types, increment question index and render the corresponding question component
      questionIndex++;

      switch (question.type) {
        case "short response":
          return (
            <ShortResponse
              key={question._id}
              question={question}
              onChange={(e) => handleQuestionChange(e, index)}
              id={question._id}
              removeQuestion={() => removeQuestion(index)}
              index={questionIndex}
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
              index={questionIndex}
            />
          );
        case "true/false":
          return (
            <TrueFalse
              key={question._id}
              question={question}
              id={question._id}
              onChange={(e) => handleQuestionChange(e, index)}
              removeQuestion={() => removeQuestion(index)}
              index={questionIndex}
            />
          );
        case "conditional":
          return (
            <ConditionalQuestion
              key={question._id}
              question={question}
              id={question._id}
              onChange={(e) => handleQuestionChange(e, index)}
              removeQuestion={() => removeQuestion(index)}
              index={questionIndex}
            />
          );
        default:
          return null;
      }
    });

    const chooseQuestionTypeForm = (
      <>
        <div style={{ backgroundColor: "#edf4f5", marginTop: 20, padding: 20 }}>
          <h4 style={{ color: "#0c66a9", marginBottom: 1.2 + "rem" }}>
            Choose a Question Type
          </h4>
          <Form.Select
            size="small"
            aria-label="Select Question Type"
            onChange={addQuestion}
            style={{
              borderRadius: 1,
              color: "#42a4c4",
              fontSize: 1.1 + "rem",
              borderColor: "#008cba",
            }}
          >
            <option style={{ backgroundColor: "#0c66a9", color: "#fff" }}>
              Choose one below
            </option>
            <option value="1">Short Response (Question type)</option>
            <option value="2">True/False (Question type)</option>
            <option value="3">Paragraph (Question type)</option>
            <option value="4">New Section</option>
            {/* <option value="5">Conditional Question(Question type)</option> */}
          </Form.Select>
        </div>
      </>
    );

    return { form, chooseQuestionTypeForm };
  };

  const { form, chooseQuestionTypeForm } = makeSurvey();

  return (
    <div className="mb-5 container">
      <SurveyTitle
        onChange={(e) => handleSurveyChange(e)}
        survey={survey}
        title={survey.title}
        description={survey.description}
      />
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
