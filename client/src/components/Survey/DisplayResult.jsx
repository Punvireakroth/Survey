import { useState, useEffect, useCallback } from "react";
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
        }
      });
      setResult(updatedResults);
    }
  }, [survey]);

  return (
    <div>
      <h2>{survey ? survey.title : null}</h2>
      <h4>Survey Result</h4>
      <Container>{result}</Container>
    </div>
  );
}
