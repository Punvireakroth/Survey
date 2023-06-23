import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";

import uniqid from "uniqid";

export function ShortResponse(props) {
  return (
    <Form.Group
      className="mb-3"
      style={{
        marginTop: 30,
        backgroundColor: "#edf4f5",
        padding: 20,
        borderRadius: 7,
        border: "3px dashed rgba(122, 192, 215, .6)",
        color: "#0c66a9",
        fontSize: 1.4 + "rem",
      }}
    >
      <Form.Label>
        {props.index + 1}) {props.question.question}
      </Form.Label>
      <Form.Control
        id={props.question._id}
        onChange={(e) => props.onChange(e, props.responseId, "short response")}
        name="short response"
        value={props.question.response.response}
        type="text"
        placeholder="Your answer"
        className="custom-input shadow-none"
        style={{
          borderRadius: 1,
          color: "#42a4c4",
          fontSize: 1.1 + "rem",
          borderColor: "#undefined",
        }}
      />
    </Form.Group>
  );
}

export function TrueFalse(props) {
  const [answerValue, setAnswerValue] = useState(null);
  const [isChecked, setIsChecked] = useState(() =>
    props.question.answer_choices
      ? props.question.answer_choices.map((answer) => ({
          answer_choice: answer,
          value: false,
        }))
      : []
  );

  const onChangeChecked = (e, index) => {
    let updatedIsChecked = [...isChecked];

    for (let i = 0; i < updatedIsChecked.length; i++) {
      if (i === index) {
        updatedIsChecked[i].value = true;
      } else {
        updatedIsChecked[i].value = false;
      }
    }
    setIsChecked(updatedIsChecked);
    setAnswerValue(e.target.value);
  };

  const answerChoices = props.question.answer_choices
    ? props.question.answer_choices.map((answer, index) => (
        <Form.Check
          key={uniqid()}
          label={answer}
          value={answer}
          name={props.question._id}
          type="radio"
          checked={isChecked[index]?.value}
          onChange={(e) => {
            onChangeChecked(e, index);
            props.onChange(e, props.responseId, "true/false");
          }}
        />
      ))
    : null;

  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {props.index + 1}) {props.question.question}
      </Form.Label>

      {answerChoices}
    </Form.Group>
  );
}

export function Paragraph(props) {
  return (
    <Form.Group
      className="mb-3"
      style={{
        marginTop: 30,
        backgroundColor: "#edf4f5",
        padding: 20,
        borderRadius: 7,
        border: "3px dashed rgba(122, 192, 215, .6)",
        color: "#0c66a9",
        fontSize: 1.4 + "rem",
      }}
    >
      <Form.Label>
        {props.index + 1}) {props.question.question}
      </Form.Label>
      <Form.Control
        id={props.question._id}
        onChange={(e) => props.onChange(e, props.responseId, "paragraph")}
        name="paragraph"
        value={props.question.response.response}
        type="text"
        as="textarea"
        rows={3}
        className="custom-input"
        placeholder="Your answer"
        style={{
          borderRadius: 1,
          color: "#42a4c4",
          fontSize: 1.1 + "rem",
          borderColor: "#undefined",
        }}
      />
    </Form.Group>
  );
}

export function SurveyTitle(props) {
  return (
    <div
      style={{
        paddingTop: 77,
        paddingBottom: 77,
        backgroundColor: "#0c66a9",
        marginBottom: 30,
        color: "#fff",
      }}
    >
      <h1 style={{ textAlign: "center" }}>{props.survey.title}</h1>
      <h4 style={{ textAlign: "center" }} className="text-muted">
        {props.survey.description}
      </h4>
    </div>
  );
}
