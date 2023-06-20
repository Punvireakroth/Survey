import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";

import uniqid from "uniqid";

export function ShortResponse(props) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {props.index + 1}) {props.question.question}
      </Form.Label>
      <Form.Control
        id={props.question._id}
        onChange={(e) => props.onChange(e, "short response")}
        name="short response"
        value={props.question.response.response}
        type="text"
      />
    </Form.Group>
  );
}

export function TrueFalse(props) {
  const [answerValue, setAnswerValue] = useState(null);
  const [isChecked, setIsChecked] = useState([]);

  useEffect(() => {
    if (props.question.answer_choices) {
      setIsChecked(
        props.question.answer_choices.map((answer) => ({
          answer_choice: answer,
          value: false,
        }))
      );
    }
  }, [props.question.answer_choices]);

  const onChangeChecked = (e, index) => {
    const updatedIsChecked = isChecked.map((item, i) => ({
      ...item,
      value: i === index,
    }));

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
    <Form.Group className="mb-3">
      <Form.Label>
        {props.index + 1}) {props.question.question}
      </Form.Label>
      <Form.Control
        id={props.question._id}
        onChange={(e) => props.onChange(e, "paragraph")}
        name="paragraph"
        value={props.question.response.response}
        type="text"
        as="textarea"
        rows={3}
      />
    </Form.Group>
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
