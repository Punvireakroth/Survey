import { Button, Form, Spinner } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";

import uniqid from "uniqid";
import {
  NewSection,
  SurveyTitle,
  Paragraph,
  ShortResponse,
  TrueFalse,
  Checkbox,
} from "./questionComponents";

const DisplaySurvey = (props) => {
  const [survey, setSurvey] = useState({});
  const [newForm, setNewForm] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthContext();

  const callApi = useCallback(
    async (url, fetchOptions) => {
      try {
        const response = await fetch(`http://localhost:5000${url}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          ...fetchOptions,
        });

        const responseData = await response.json();

        let questions = [];

        responseData.questions.forEach((question) => {
          const newQuestion = {
            _id: question._id,
            type: question.type,
            question: question.question,
            answer_choices: question.answer_choices,
            response: {
              response: "",
              time: "",
              _id: uniqid("response-"),
            },
          };
          questions.push(newQuestion);
        });
        let updatedSurvey = {
          _id: responseData._id,
          questions: questions,
          title: responseData.title,
          description: responseData.description,
          creationTime: responseData.creationTime,
        };
        setSurvey(updatedSurvey);
      } catch (e) {
        console.log(e.error);
      }
    },
    [user]
  );

  useEffect(() => {
    setSurvey({ ...survey, _id: id });
    //callApi to get survey information from the database

    callApi(`/api/surveys/${id}`, {
      method: "GET",
    });
  }, [user, id]);

  useEffect(() => {
    let questionIndex = -1;
    if (survey.title === undefined) {
      setNewForm(
        <div style={{ textAlign: "center", padding: 20 }}>
          <Spinner animation="border" />
        </div>
      );
    } else {
      let form = survey.questions.map((question, index) => {
        // If the question is a new section, skip the question index
        if (question.type === "new section") {
          // render the text without counting it as a question
          return (
            <NewSection
              id={question._id}
              key={question._id}
              question={question}
            />
          );
        }
        // If the question is not a new section, increment the question index
        questionIndex++;

        switch (question.type) {
          case "short response":
            return (
              <ShortResponse
                key={question._id}
                question={question}
                index={questionIndex}
                onChange={handleChange}
                responseId={question.response._id}
                submitSurvey={submitSurvey}
              />
            );
          case "checkbox":
            return (
              <Checkbox
                key={question._id}
                question={question}
                index={questionIndex}
                onChange={handleChange}
                responseId={question.response._id}
              />
            );
          case "true/false":
            return (
              <TrueFalse
                key={question._id}
                question={question}
                index={questionIndex}
                onChange={handleChange}
                responseId={question.response._id}
              />
            );
          case "paragraph":
            return (
              <Paragraph
                key={question._id}
                question={question}
                index={questionIndex}
                onChange={handleChange}
                responseId={question.response._id}
                submitSurvey={submitSurvey} // Pass the submitSurvey function to the Paragraph component
              />
            );

          default:
            return null;
        }
      });

      setNewForm(form);
    }
  }, [survey]);

  const handleChange = (e, responseId) => {
    setSurvey((prevSurvey) => {
      const surveyObject = { ...prevSurvey };
      const index = surveyObject.questions.findIndex(
        (question) => question.response._id === responseId
      );

      surveyObject.questions[index].response = {
        ...surveyObject.questions[index].response,
        response: e.target.value,
        time: new Date(),
      };

      // Check if the selected question has the specific condition and the user answered "True"
      const selectedQuestion = surveyObject.questions[index];
      const isSpecificConditionTrue = selectedQuestion.question.includes(
        "លក់ទៅឱ្យដេប៉ូផេ្សងដែរឬទេ"
      );
      const isUserAnswerTrue = e.target.value === "True";

      // Function to add the dynamic short response question
      const addDynamicShortResponseQuestion = () => {
        const nextQuestion = surveyObject.questions[index + 1];
        const nextQuestionIncludesTarget =
          nextQuestion && nextQuestion.question.includes("ប៉ុន្មានដេប៉ូ?");
        if (!nextQuestionIncludesTarget) {
          const newShortResponseQuestion = {
            _id: uniqid("question-"),
            type: "short response",
            question: "ប៉ុន្មានដេប៉ូ?",
            answer_choices: [],
            response: {
              response: "",
              time: "",
              _id: uniqid("response-"),
            },
          };
          surveyObject.questions.splice(index + 1, 0, newShortResponseQuestion);
        }
      };

      // Function to remove the dynamic short response question
      const removeDynamicShortResponseQuestion = () => {
        const nextQuestion = surveyObject.questions[index + 1];
        if (nextQuestion) {
          const nextQuestionIncludesTarget =
            nextQuestion.question.includes("ប៉ុន្មានដេប៉ូ?");
          if (nextQuestionIncludesTarget) {
            surveyObject.questions.splice(index + 1, 1);
          }
        }
      };

      if (isSpecificConditionTrue) {
        if (isUserAnswerTrue) {
          addDynamicShortResponseQuestion();
        } else {
          removeDynamicShortResponseQuestion();
        }
      }

      // Check if all inputs are valid
      const allInputsValid = surveyObject.questions
        .filter((question) => question.type !== "new section")
        .every((question) => question.response.response.length > 0);
      setIsFormValid(allInputsValid);

      return surveyObject;
    });
  };

  const submitSurvey = async (e) => {
    e.preventDefault();
    // Save response to database
    try {
      const response = await fetch(
        `http://localhost:5000/api/surveys/update-responses/${survey._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            questions: survey.questions,
            _id: survey._id,
          }),
        }
      );
      if (response.ok) {
        navigate(`/display-survey/submit-survey/${id}`);
      } else {
        throw new Error("Failed to submit the survey.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="displaySurvey pt-6 container"
      style={{ fontFamily: "Nokora", fontSize: "1.2rem", marginBottom: 50 }}
    >
      <SurveyTitle survey={survey} style={{ marginTop: 20 }} />
      {newForm}
      <Button
        onClick={submitSurvey}
        disabled={!isFormValid}
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#ffffff",
          paddingTop: 7,
          paddingBottom: 7,
          paddingLeft: 50,
          paddingRight: 50,
          borderRadius: 50,
          color: "#fff",
          borderColor: "#0c66a9 ",
          backgroundColor: "#0c66a9 ",
          borderWidth: 2.9,
          marginTop: 40,
          marginBottom: 40 + "px",
        }}
      >
        Submit
      </Button>
      <br />
    </div>
  );
};

export default DisplaySurvey;
