import { useState, useEffect, React } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FaFileExcel } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function DataGridComponent() {
  const { user } = useAuthContext();
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [surveys, setSurveys] = useState(null);
  const [survey, setSurvey] = useState(null);
  const [selectedSurvey, setSelectedSurvey] = useState("");

  useEffect(() => {
    fetchAllSurveyData();
  }, [user]);

  // Fetch all the survey

  const fetchAllSurveyData = async (fetchOptions) => {
    try {
      const response = await fetch("http://localhost:5000/api/surveys/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        ...fetchOptions,
      });
      const responseData = await response.json();
      console.log(responseData);
      setSurveys(responseData);

      // Check if a default survey is not selected yet
      if (!selectedSurvey && responseData.length > 0) {
        setSelectedSurvey(responseData[0]); // Set the first survey as default
      }
    } catch (e) {
      console.log(e.error);
    }
  };

  // Fetch the survey data by ID
  const fetchSurveyDataById = async (surveyId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/surveys/${surveyId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      setSelectedSurvey(responseData);
    } catch (e) {
      console.log(e.error);
    }
  };

  const handleSurveyChange = async (surveyId) => {
    // Call fetchSurveyDataById with the selected survey ID
    fetchSurveyDataById(surveyId);
  };

  useEffect(() => {
    // Update DataGrid columns and rows when a survey is selected
    if (selectedSurvey) {
      const surveyColumns = selectedSurvey.questions.map((question, index) => ({
        field: `question_${index + 1}`,
        headerName: question.question,
        width: 200,
      }));

      const dataRows = selectedSurvey.questions[0].responses.map(
        (response, index) =>
          selectedSurvey.questions.reduce(
            (rowData, question, questionIndex) => {
              rowData["id"] = index + 1;
              rowData[`question_${questionIndex + 1}`] =
                question.responses[index]?.response || "";
              return rowData;
            },
            {}
          )
      );

      setTableData(dataRows);
      setColumns(surveyColumns);
    }
  }, [selectedSurvey]);

  // Function to export the survey result as an excel file
  const exportAsXLSX = () => {
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    const sheetName = "Survey Result"; // Name of the sheet
    // const sheetData = []; // Data of the sheet
    const data = [[...selectedSurvey.questions.map((q) => q.question)]]; // Data of the sheet

    // Iterate through each question in the survey
    for (let i = 0; i < selectedSurvey.questions[0].responses.length; i++) {
      const row = [];
      selectedSurvey.questions.forEach((question) => {
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
    saveAs(blob, `${selectedSurvey.title}.xlsx`); // Save the blob as an excel file
  };

  return (
    <div
      style={{
        height: "100%",
        marginLeft: 50,
        marginRight: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 40,
        }}
      >
        <Dropdown as={ButtonGroup}>
          <Button
            style={{
              paddingLeft: 30,
              border: "3px solid #0c66a9",
              backgroundColor: "#ffffff",
              color: "#0c66a9",
              fontSize: 1.3 + "rem",
            }}
          >
            Choose the Survey Data{" "}
          </Button>
          <Dropdown.Toggle
            split
            id="dropdown-split-basic"
            style={{
              padding: 15,
              paddingRight: 20,
              paddingLeft: 20,
              backgroundColor: "#0c66a9",
              borderColor: "#0c66a9",
              color: "#ffffff",
            }}
          />

          <Dropdown.Menu>
            {surveys &&
              surveys.map((survey) => (
                <Dropdown.Item
                  key={survey._id}
                  value={survey._id}
                  onClick={() => handleSurveyChange(survey._id)}
                >
                  {survey.title}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
        <Button
          onClick={exportAsXLSX}
          style={{
            backgroundColor: "#008cba",
            paddingRight: 20,
            paddingLeft: 20,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 10,
            color: "#fff",
            fontSize: 1.3 + "rem",
            borderColor: "#008cba",
            borderWidth: 3,
          }}
        >
          <FaFileExcel /> Export Excel
        </Button>
      </div>

      <div>
        <DataGrid
          rows={tableData}
          columns={columns}
          pageSize={5}
          style={{
            borderRadius: 10,
            fontFamily: "Nokora",
            fontSize: "1.1rem",
            padding: 20,
          }}
        />
      </div>
    </div>
  );
}

export default DataGridComponent;
