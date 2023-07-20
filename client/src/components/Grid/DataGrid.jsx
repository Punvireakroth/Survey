import { useState, useEffect, React } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FaFileExcel } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function CustomToolbar(props) {
  return (
    <div className="ag-grid-toolbar">
      <div className="ag-toolbar-row">
        <div className="ag-toolbar-column">
          <div className="ag-filter-toolbar">
            <div className="ag-toolbar-filter-input">
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => props.api.setQuickFilter(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DataGridComponent() {
  const { user } = useAuthContext();
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [surveys, setSurveys] = useState(null);
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
        headerName: question.question,
        field: `question_${index + 1}`,
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
      </div>

      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          rowData={tableData}
          columnDefs={columns}
          domLayout="autoHeight"
          defaultColDef={{
            resizable: true,
            sortable: true,
            filter: true,
          }}
        />
      </div>
    </div>
  );
}

export default DataGridComponent;
