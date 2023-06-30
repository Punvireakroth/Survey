import { Button, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import uniqid from "uniqid";
import {
  NewSection,
  SurveyTitle,
  Paragraph,
  ShortResponse,
  TrueFalse,
} from "./displayQuestionComponents";

const DisplaySurvey = (props) => {
  const [survey, setSurvey] = useState({});
  const [newForm, setNewForm] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const callApi = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/surveys/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
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
  };

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if (survey.title === undefined) {
      setNewForm(
        <div style={{ textAlign: "center", padding: 20 }}>
          <Spinner animation="border" />
        </div>
      );
    } else {
      let form = survey.questions.map((question, index) => {
        switch (question.type) {
          case "short response":
            return (
              <ShortResponse
                key={question._id}
                question={question}
                index={index}
                onChange={handleChange}
                responseId={question.response._id}
              />
            );
          case "true/false":
            return (
              <TrueFalse
                key={question._id}
                question={question}
                index={index}
                onChange={handleChange}
                responseId={question.response._id}
              />
            );
          case "paragraph":
            return (
              <Paragraph
                key={question._id}
                question={question}
                index={index}
                onChange={handleChange}
                responseId={question.response._id}
              />
            );
          case "new section":
            return (
              <NewSection
                key={question._id}
                question={question}
                index={index}
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
    let surveyObject = { ...survey };
    let index = surveyObject.questions.findIndex(
      (question) => question.response._id === responseId
    );

    surveyObject.questions[index].response = {
      ...surveyObject.questions[index].response,
      response: e.target.value,
      time: new Date(),
    };
    setSurvey(surveyObject);
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
      className="displaySurvey pt-6"
      style={{ fontFamily: "Nokora", fontSize: "1.2rem", marginBottom: 50 }}
    >
      <SurveyTitle survey={survey} />
      {newForm}
      <Button
        onClick={submitSurvey}
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
