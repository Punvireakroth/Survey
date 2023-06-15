import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShortResponseResult } from "./displayResultComponents";
import { Container } from "react-bootstrap";

export default function DisplayResult() {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const [result, setResult] = useState(null);

  const callApi = async (url, fetchOptions) => {
    try {
      const response = await fetch(
        `http://localhost:5000/${url}`,
        fetchOptions
      );
      const responseData = await response.json();
      setSurvey(responseData);
    } catch (e) {
      console.log(e.error);
    }
  };
  useEffect(() => {
    callApi(`api/surveys/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [id]);

  useEffect(() => {
    if (survey) {
      const updateResult = survey.questions.map((question, index) => {
        return (
          <ShortResponseResult
            key={question._id}
            question={question}
            index={index + 1}
          />
        );
      });
      setResult(updateResult);
    }
  }, [survey]);

  return (
    <Container>
      <h2>{survey ? survey.title : null}</h2>
      <h4>Survey Result</h4>
      <Container>{result}</Container>
    </Container>
  );
}
