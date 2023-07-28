import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import uniqid from "uniqid";

// -------------------------Short Response Component--------------------------
export function ShortResponse(props) {
  // form validation
  const [isValid, setIsValid] = useState(false); // Track validity of the input
  const [isTouched, setIsTouched] = useState(false); // Track if the input field has been touched

  const handleBlur = () => {
    setIsTouched(true);
    setIsValid(props.question.response.response.trim() !== "");
  };

  const handleChange = (e) => {
    props.onChange(e, props.responseId);
  };

  useEffect(() => {
    setIsValid(props.question.response.response.trim() !== "");
  }, [props.question.response.response]);

  // get user location
  const [currLocation, setCurrLocation] = useState("ចុចប៊ូតុងយកទីតាំង");

  // Get location without button
  const getLocation = () => {
    setIsValid(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrLocation({ latitude, longitude });
      console.log(currLocation);

      if (props.question.question.includes("ទីតាំង")) {
        props.onChange(
          { target: { value: `${latitude}, ${longitude}` } },
          props.responseId,
          "short response"
        );
      }
    });
  };

  useEffect(() => {
    // Derive the values of the required variables
    const getLocationButton = props.question.question.includes("ទីតាំង");

    // Update the state variables
    if (getLocationButton && currLocation === "ចុចប៊ូតុងយកទីតាំង") {
      getLocation();
    }
  }, []);

  return (
    <Form noValidate validated={isValid} onSubmit={props.submitSurvey}>
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
          position: "relative",
        }}
      >
        <Form.Label>
          {props.index + 1}) {props.question.question}
        </Form.Label>
        <Form.Control
          id={props.question._id}
          onClick={(e) => e.target.select()}
          onChange={handleChange}
          onBlur={handleBlur}
          name="short response"
          value={props.question.response.response}
          type="text"
          placeholder="Your answer"
          className={isTouched && !isValid ? "is-invalid" : ""}
          style={{
            borderRadius: 1,
            color: "#42a4c4",
            fontSize: 1.1 + "rem",
          }}
          disabled={props.question.question.includes("ទីតាំង")}
        />
        {isTouched && isValid && (
          <Form.Control.Feedback type="valid">Look Good</Form.Control.Feedback>
        )}
      </Form.Group>
    </Form>
  );
}

// ---------------------------------Checkbox Component---------------------------------
export function Checkbox(props) {
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
    updatedIsChecked[index].value = !updatedIsChecked[index].value;
    setIsChecked(updatedIsChecked);
  };

  const answerChoices = props.question.answer_choices
    ? props.question.answer_choices.map((answer, index) => (
        <Form.Check
          key={uniqid()}
          label={answer}
          value={answer}
          name={props.question._id}
          type="checkbox"
          checked={isChecked[index]?.value}
          onChange={(e) => {
            onChangeChecked(e, index);
            props.onChange(e, props.responseId, "checkbox");
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

// -------------------------True False Component--------------------------
export function TrueFalse(props) {
  const [isChecked, setIsChecked] = useState(() =>
    props.question.answer_choices
      ? props.question.answer_choices.map((answer) => ({
          answer_choice: answer,
          value: false,
        }))
      : []
  );

  const [showSubQuestion, setShowSubQuestion] = useState(false);

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

    const showSubQuestion = props.question.question.includes(
      "លក់ទៅឱ្យដេប៉ូផេ្សងដែរឬទេ"
    );
    if (showSubQuestion && e.target.value === "True") {
      setShowSubQuestion(true);
    } else {
      setShowSubQuestion(false);
    }
    setIsChecked(updatedIsChecked);
  };

  const answerChoices = props.question.answer_choices
    ? props.question.answer_choices.map((answer, index) => (
        <Form.Group
          style={{
            display: "flex",
            alignItems: "center",
            padding: 10,
            backgroundColor: isChecked[index]?.value
              ? "#D6E6F2"
              : "transparent",
          }}
        >
          <Form.Check
            key={uniqid()}
            id={`radio-${index}`}
            value={answer}
            name={props.question._id}
            type="radio"
            checked={isChecked[index]?.value}
            onChange={(e) => {
              onChangeChecked(e, index);
              props.onChange(e, props.responseId, "true/false");
            }}
          />
          <Form.Label
            htmlFor={`radio-${index}`}
            style={{
              cursor: "pointer",
              marginLeft: 10,
              marginTop: 12,
            }}
          >
            {answer}
          </Form.Label>
        </Form.Group>
      ))
    : null;

  const subQuestion = showSubQuestion ? (
    <Form.Group style={{ marginTop: 10 }}>
      <Form.Label>ចំនួនប៉ុន្មានដេប៉ូ?</Form.Label>
      <Form.Control type="text" placeholder="Enter your answer" />
    </Form.Group>
  ) : null;

  return (
    <Form.Group
      style={{
        marginTop: 30,
        backgroundColor: "#edf4f5",
        padding: 20,
        borderRadius: 7,
        border: "3px dashed rgba(122, 192, 215, .6)",
        color: "#0c66a9",
        fontSize: "1.4rem",
      }}
    >
      <Form.Label>
        {props.index + 1}) {props.question.question}
      </Form.Label>

      {answerChoices}
      {subQuestion}
    </Form.Group>
  );
}

// -------------------------Paragraph Component--------------------------
export function Paragraph(props) {
  const [isTouched, setIsTouched] = useState(false); // Track if the input field has been touched
  const [isValid, setIsValid] = useState(true); // Track validity of the input

  const handleBlur = () => {
    setIsTouched(true);
    setIsValid(props.question.response.response.trim() !== "");
  };

  const handleChange = (e) => {
    props.onChange(e, props.responseId);
  };

  useEffect(() => {
    setIsValid(props.question.response.response.trim() !== "");
  }, [props.question.response.response]);

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
        fontSize: "1.4rem",
      }}
    >
      <Form.Label>
        {props.index + 1}) {props.question.question}
      </Form.Label>
      <Form.Control
        id={props.question._id}
        onChange={handleChange}
        onBlur={handleBlur}
        name="paragraph"
        value={props.question.response.response}
        type="text"
        as="textarea"
        rows={3}
        className={isTouched && !isValid ? "is-invalid" : ""}
        placeholder="Your answer"
        style={{
          borderRadius: 1,
          color: "#42a4c4",
          fontSize: "1.1rem",
        }}
      />
      {isTouched && !isValid && (
        <Form.Control.Feedback type="invalid">
          Please input the response.
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}

// -------------------------New Section Component--------------------------
export function NewSection(props) {
  return (
    <Form.Group
      className="mb-3"
      style={{
        marginTop: 30,
        backgroundColor: "#1193be",
        padding: 50,
        borderRadius: 7,
        border: "3px none rgba(122, 192, 215, .6)",
        color: "#fff",
        fontSize: 1.4 + "rem",
      }}
    >
      <h4
        style={{
          textAlign: "center",
          fontSize: 1.5 + "em",
        }}
      >
        {props.question.question}
      </h4>
    </Form.Group>
  );
}

// -------------------------Survey Title Component--------------------------
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
      <h4
        style={{
          textAlign: "center",
          paddingTop: 20,
          color: "#fff",
          opacity: "70%",
        }}
      >
        {props.survey.description}
      </h4>
    </div>
  );
}
