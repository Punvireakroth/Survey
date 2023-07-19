import { useState, useEffect, React } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useParams } from "react-router-dom";

function DataGridComponent() {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    fetchSurveyData();
  }, []);

  // Fetch survey information using callApi function
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

  const fetchSurveyData = async () => {
    callApi(`api/surveys/survey-lk27bpwj`, {
      method: "GET",
    });
  };

  useEffect(() => {
    // Update DataGrid columns and rows
    if (survey) {
      const surveyColumns = survey.questions.map((question, index) => ({
        field: `question_${index + 1}`,
        headerName: question.question,
        width: 300,
      }));

      const dataRows = survey.questions[0].responses.map((_, index) =>
        survey.questions.reduce((rowData, question, questionIndex) => {
          rowData["id"] = index + 1;
          rowData[`question_${questionIndex + 1}`] =
            question.responses[index]?.response || "";
          return rowData;
        }, {})
      );

      setTableData(dataRows);
      setColumns(surveyColumns);
    }
  }, [survey]);

  return (
    <div
      style={{
        height: "100%",
        marginLeft: 50,
        marginRight: 50,
      }}
    >
      <div style={{ marginBottom: 40 }}>
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
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div>
        <DataGrid
          rows={tableData}
          columns={columns}
          pageSize={5}
          style={{ borderRadius: 10 }}
          sx={{
            borderColor: "#0c66a9",
            "& .MuiDataGrid-cell": {
              borderColor: "#1f9ac2",
            },
            borderWidth: 3,
          }}
        />
      </div>
    </div>
  );
}

export default DataGridComponent;
