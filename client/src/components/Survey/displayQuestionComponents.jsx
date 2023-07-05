import { useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";

import uniqid from "uniqid";

export function ShortResponse(props) {
  // get user location
  const [currLocation, setCurrLocation] = useState("ចុចប៊ូតុងយកទីតាំង");
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const getLocation = () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrLocation({ latitude, longitude });
      console.log(currLocation);
      setIsLoading(false);

      if (props.question.question.includes("ទីតាំង")) {
        props.onChange(
          { target: { value: `${latitude}, ${longitude}` } },
          props.responseId,
          "short response"
        );
      }
    });
  };

  // If question about location is asked, set the default value to the user's location

  const getLocationButton = props.question.question.includes("ទីតាំង");

  const handleInputChange = (e) => {
    setIsInvalid(false);
    props.onChange(e, props.responseId, "short response");
  };

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
        position: "relative",
      }}
    >
      <Form.Label>
        {props.index + 1}) {props.question.question}
      </Form.Label>
      <Form.Control
        id={props.question._id}
        onClick={(e) => e.target.select()} // Handle click event to select the text
        onChange={handleInputChange}
        name="short response"
        value={props.question.response.response}
        type="text"
        placeholder="Your answer"
        isInvalid={isInvalid}
        className="custom-input shadow-none"
        style={{
          borderRadius: 1,
          color: "#42a4c4",
          fontSize: 1.1 + "rem",
        }}
      />
      <FormControl.Feedback type="invalid">
        Please provide a valid response.
      </FormControl.Feedback>
      {getLocationButton && (
        <Button
          variant="primary"
          onClick={getLocation}
          disabled={isLoading}
          style={{
            marginLeft: "10px",
            position: "absolute",
            right: 20,
            top: 10,
            alignItems: "center",
            backgroundColor: "#ffffff",
            paddingTop: 2,
            paddingBottom: 0,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 50,
            color: "#fff",
            borderColor: "#0c66a9 ",
            backgroundColor: "#0c66a9 ",
            borderWidth: 2.9,
          }}
        >
          {isLoading ? "Loading..." : "យកទីតំាង Auto"}
        </Button>
      )}
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
  const [isValid, setIsValid] = useState(false); // Track validity of the input
  const [isFilled, setIsFilled] = useState(false); // Track if the input is filled

  const handleChange = (e) => {
    props.onChange(e, props.responseId);
    setIsFilled(e.target.value.length > 0);
    setIsValid(e.target.value.length > 0); // Set validity based on input length
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setIsValid(isTouched && !isFilled); // Set validity based on touched and filled

  //   if (isTouched && isFilled) {
  //     // Show the error message
  //     return;
  //   }

  //   props.submitSurvey();
  // };

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
          fontSize: "1.4rem",
        }}
      >
        <Form.Label>
          {props.index + 1}) {props.question.question}
        </Form.Label>
        <Form.Control
          id={props.question._id}
          onChange={handleChange}
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
            fontSize: "1.1rem",
          }}
          isInvalid={!isValid} // Add the isInvalid prop to show the validation feedback
        />
        {!isFilled ? (
          <Form.Control.Feedback type="invalid">
            Please provide a valid response.
          </Form.Control.Feedback>
        ) : (
          <Form.Control.Feedback type="valid">Look Good</Form.Control.Feedback>
        )}
      </Form.Group>
    </Form>
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
