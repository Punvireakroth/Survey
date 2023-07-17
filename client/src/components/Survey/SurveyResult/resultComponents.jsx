import { Table, Row, Col, Form } from "react-bootstrap";

export function ShortResponseResult(props) {
  const responses = props.question.responses.map((response, index) => {
    return (
      <tr key={index}>
        <th style={{ fontWeight: "normal" }}>
          {index + 1}) {response.response}
        </th>
      </tr>
    );
  });

  return (
    <Row
      style={{
        backgroundColor: "#edf4f5",
        paddingTop: 20,
        marginTop: 30,
        color: "#008cba",
      }}
    >
      <Col lg={3} sm={12} style={{ flexGrow: 6, margin: 10 }}>
        <h4
          style={{ textAlign: "left", fontWeight: 500, fontFamily: "Nokora" }}
        >
          សំណួរទី {props.index}: {props.question.question}
        </h4>
        <div style={{ overflowY: "scroll", height: 300 }}>
          <Table striped bordered hover style={{ fontFamily: "Nokora" }}>
            <thead>
              <tr>
                <th style={{ color: "#008cba" }}>ការឆ្លើយតប</th>
              </tr>
            </thead>
            <tbody style={{ color: "#008cba" }}>{responses}</tbody>
          </Table>
        </div>
      </Col>
    </Row>
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
    <div>
      <h2>{props.survey.title}</h2>
      <br />
    </div>
  );
}
