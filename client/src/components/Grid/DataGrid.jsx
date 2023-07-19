import { useState, useEffect, React } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";

const columns = [
  { field: "id", headerName: "ID" },
  { field: "title", headerName: "Title", width: 300 },
  { field: "body", headerName: "Body", width: 600 },
];

function DataGridComponent() {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setTableData(data);
      });
  }, []);

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
          headerClassName="red-header"
          sx={{
            borderColor: "#0c66a9",
            "& .MuiDataGrid-cell": {
              borderColor: "#1f9ac2",
              borderWidth: 2,
            },
            borderWidth: 3,
          }}
        />
      </div>
    </div>
  );
}

export default DataGridComponent;
