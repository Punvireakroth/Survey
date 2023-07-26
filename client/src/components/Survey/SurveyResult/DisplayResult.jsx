import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import {
  ShortResponseResult,
  NewSection,
  TrueOrFalseResult,
} from "./resultComponents";
import { Container, Spinner, Button } from "react-bootstrap";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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
        } else if (question.type === "true/false") {
          return (
            <TrueOrFalseResult
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

  // Function to export the survey result as an excel file
  const exportAsXLSX = () => {
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    const sheetName = "Survey Result"; // Name of the sheet

    // const sheetData = []; // Data of the sheet
    const data = [[...survey.questions.map((q) => q.question)]]; // Data of the sheet

    // Iterate through each question in the survey
    for (let i = 0; i < survey.questions[0].responses.length; i++) {
      const row = [];
      survey.questions.forEach((question) => {
        row.push(question.responses[i]?.response || "");
      });
      data.push(row);
    }

    const worksheet = XLSX.utils.aoa_to_sheet(data); // Convert the sheet data to worksheet
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName); // Append the worksheet to the workbook

    const fileBuffer = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
    }); // Write the workbook to a buffer

    const blob = new Blob([fileBuffer], { type: "application/octet-stream" }); // Create a blob from the buffer
    saveAs(blob, `${survey.title}.xlsx`); // Save the blob as an excel file
  };

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
            onClick={exportAsXLSX}
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
