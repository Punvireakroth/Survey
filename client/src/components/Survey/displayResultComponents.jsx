import { Table, Row, Col } from "react-bootstrap";

export function ShortResponseResult(props) {
  const responses = props.question.responses.map((response, index) => {
    <tr key={index}>
      <th style={{ fontWeight: "normal" }}>
        {index + 1}
        {response.response}
      </th>
    </tr>;
  });

  return (
    <Row>
      <Col lg={3} sm={12} style={{ flexGrow: 6, margin: 10 }}>
        <h4 style={{ textAlign: "center", fontWeight: 500 }}>
          Question {props.index}: {props.question.question}
        </h4>
        <div style={{ overflowY: "scroll", height: 300 }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Responses</th>
              </tr>
            </thead>
            <tbody>{responses}</tbody>
          </Table>
        </div>
      </Col>
    </Row>
  );
}

export function SurveyTitle(props) {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>{props.survey.title}</h2>
      <h4 style={{ textAlign: "center" }} className="text-muted">
        {props.survey.description}
      </h4>
      <br />
    </>
  );
}
