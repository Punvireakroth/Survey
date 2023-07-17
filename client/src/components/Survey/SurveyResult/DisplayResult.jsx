import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { ShortResponseResult, NewSection } from "./resultComponents";
import { Container, Spinner, Button } from "react-bootstrap";

export default function DisplayResult() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [survey, setSurvey] = useState(null);
  const [result, setResult] = useState(
    <div style={{ textAlign: "center", padding: 20 }}>
      <Spinner animation="border" />
    </div>
  );

  const callApi = async (url, fetchOptions) => {
    try {
      const response = await fetch(`http://localhost:5000/${url}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        ...fetchOptions,
      });

      const responseData = await response.json();
      setSurvey(responseData);
      console.log(survey);
    } catch (e) {
      console.log(e.error);
    }
  };
  useEffect(() => {
    callApi(`api/surveys/${id}`, {
      method: "GET",
    });
  }, [user, id]);

  useEffect(() => {
    let questionIndex = 0;
    if (survey) {
      const updatedResults = survey.questions.map((question, index) => {
        if (question.type === "new section") {
          return <NewSection key={question._id} question={question} />;
        }
        questionIndex++;

        if (
          question.type === "short response" ||
          question.type === "paragraph"
        ) {
          return (
            <ShortResponseResult
              key={id}
              question={question}
              index={questionIndex}
            />
          );
        } else {
          return null;
        }
      });
      setResult(updatedResults);
    }
  }, [survey]);

  return (
    <div>
      <div
        style={{
          backgroundColor: "#0c66a9",
          color: "#fff",
          paddingTop: 40,
          paddingBottom: 40,
          paddingLeft: 40,
          borderRadius: 7,
          position: "relative",
        }}
        className="container"
      >
        <h2
          style={{
            textAlign: "left",
            fontFamily: "Nokora",
            fontWeight: "bold",
          }}
        >
          {survey ? survey.title : null}
        </h2>
        <h4 style={{ textAlign: "left", fontFamily: "Nokora" }}>
          លិទ្ធផលពីការឆ្លើយតប
        </h4>
        <div>
          <Button
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              alignItems: "center",
              backgroundColor: "#0c66a9",
              paddingTop: 7,
              paddingBottom: 7,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 50,
              color: "#fff",
              borderColor: "#008cba",
              borderWidth: 2.9,
            }}
            className="export-button"
          >
            Export Excel
          </Button>
        </div>
      </div>
      <Container> {result}</Container>
    </div>
  );
}
