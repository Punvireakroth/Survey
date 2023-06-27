import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShortResponseResult } from "./displayResultComponents";
import { Container, Spinner } from "react-bootstrap";

export default function DisplayResult() {
  const { id } = useParams();
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
  }, [id]);

  useEffect(() => {
    if (survey) {
      const updatedResults = survey.questions.map((question, index) => {
        if (
          question.type === "short response" ||
          question.type === "paragraph"
        ) {
          return (
            <ShortResponseResult
              key={id}
              question={question}
              index={index + 1}
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
          backgroundColor: "#edf4f5",
          color: "#008cba",
          paddingTop: 20,
          paddingBottom: 20,
          borderRadius: 7,
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontFamily: "Nokora",
            fontWeight: "bold",
          }}
        >
          {survey ? survey.title : null}
        </h2>
        <h4 style={{ textAlign: "center", fontFamily: "Nokora" }}>
          លិទ្ធផលពីការឆ្លើយតប
        </h4>
      </div>
      <Container>{result}</Container>
    </div>
  );
}
