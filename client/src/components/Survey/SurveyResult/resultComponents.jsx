import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { Container, Form } from "react-bootstrap";

export function ShortResponseResult(props) {
  const responses = props.question.responses.map((response, index) => {
    return (
      <TableRow key={index}>
        <TableCell style={{ fontWeight: "normal" }}>
          {index + 1}) {response.response}
        </TableCell>
      </TableRow>
    );
  });

  return (
    <TableContainer
      component={Paper}
      style={{
        backgroundColor: "#edf4f5",
        paddingTop: 20,
        marginTop: 30,
        color: "#008cba",
      }}
    >
      <div>
        <h4
          style={{
            textAlign: "left",
            fontWeight: 500,
            fontFamily: "Nokora",
            margin: "10px",
          }}
        >
          សំណួរទី {props.index}: {props.question.question}
        </h4>
      </div>
      <div style={{ overflowY: "scroll", height: 300 }}>
        <Table striped bordered hover style={{ fontFamily: "Nokora" }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "#008cba", fontFamily: "Nokora" }}>
                ការឆ្លើយតប
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "#008cba" }}>{responses}</TableBody>
        </Table>
      </div>
    </TableContainer>
  );
}

// --------------------------------- True or False ---------------------------------
const COLORS = ["#0088FE", "#00C49F"];

export function TrueOrFalseResult(props) {
  const { responses } = props.question;
  let trueCount = 0;
  let falseCount = 0;

  responses.forEach((response) => {
    if (response.response === "True") {
      trueCount++;
    } else {
      falseCount++;
    }
  });

  const data = [
    { name: "True", value: trueCount },
    { name: "False", value: falseCount },
  ];

  return (
    <Form.Group
      className="mb-3"
      style={{
        marginTop: 30,
        backgroundColor: "#edf4f5",
        padding: 20,
        borderRadius: 7,
      }}
    >
      <h4
        style={{
          textAlign: "left",
          fontWeight: 500,
          fontFamily: "Nokora",
          color: "#008cba",
        }}
      >
        សំណួរទី {props.index}: {props.question.question}
      </h4>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <ResponsiveContainer width="80%" height={400}>
          <PieChart>
            <Pie
              dataKey="value"
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={40} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Form.Group>
  );
}

export function NewSection(props) {
  return (
    <Form.Group
      className="mb-3"
      style={{
        marginTop: 30,
        backgroundColor: "#1193be",
        padding: 50,
        borderRadius: 7,
        color: "#fff",
        fontSize: 1.4 + "rem",
      }}
    >
      <h4
        style={{
          textAlign: "center",
          fontSize: 1.5 + "em",
          fontFamily: "Nokora",
        }}
      >
        {props.question.question}
      </h4>
    </Form.Group>
  );
}

export function SurveyTitle(props) {
  return (
    <Container>
      {" "}
      <h2>{props.survey.title}</h2>
      <br />
    </Container>
  );
}
