import { Form, Button } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";

export function ShortResponse(props) {
  return (
    <Form.Group className="mb-3">
      <CloseButton
        className="closeBtn"
        onClick={(e) => props.deleteQuestion(e, props.question.id)}
      />
      <h4>
        Question {props.index + 1}:
        <medium className="text-muted">YES/NO</medium>
      </h4>
      <Form.Label>Add your Question:</Form.Label>
      <Form.Control />
    </Form.Group>
  );
}

export function MultipleChoice(props) {
  const answerChoices = props.question.answer_choices.map((answer, index) => (
    <div key={index}>
      <Form.Control
        id={props.question._id}
        name="answerChoice"
        answernum={index}
        answer="yes"
        onChange={props.onChange}
        value={answer}
        type="text"
        placeholder={answer}
      />
      <br />
    </div>
  ));

  return (
    <Form.Group className="mb-3">
      <CloseButton
        className="closeBtn"
        onClick={(e) => props.deleteQuestion(e, props.question._id)}
      />
      <h4>
        Question {props.index + 1}:
        <medium className="text-muted"> Multiple Choice Question</medium>
      </h4>
      <Form.Label>Edit Your Question:</Form.Label>
      <Form.Control
        id={props.question._id}
        answer="no"
        onChange={props.onChange}
        name="multiple choice"
        value={props.question.question}
        type="text"
        placeholder={props.question.question}
      />

      <br />
      <br />
      <Form.Label>Edit Your Answer Choices:</Form.Label>
      {answerChoices}
      <Button
        variant="info"
        onClick={(e) => props.addAnswerChoice(e, props.question._id)}
      >
        Add More Answer Choices
      </Button>
    </Form.Group>
  );
}

export function TrueFalse(props) {
  const answerChoices = props.question.answer_choices.map((answer, index) => (
    <div key={index}>
      <Form.Control
        id={props.question._id}
        answernum={index}
        answer="yes"
        onChange={props.onChange}
        name="answerChoice"
        value={answer}
        type="text"
        placeholder={answer}
      />
      <br />
    </div>
  ));

  return (
    <Form.Group className="mb-3">
      <CloseButton
        className="closeBtn"
        onClick={(e) => props.deleteQuestion(e, props.question._id)}
      />

      <h4>
        Question {props.index + 1}:
        <medium className="text-muted"> True/False Question</medium>
      </h4>
      <Form.Label>Add Your Question:</Form.Label>
      <Form.Control
        id={props.question._id}
        answer="no"
        onChange={props.onChange}
        name="true/false"
        value={props.question.question}
        type="text"
        placeholder={props.question.question}
      />

      <br />
      <br />
      <Form.Label>Edit Your Answer Choices:</Form.Label>
      {answerChoices}
    </Form.Group>
  );
}

export function Paragraph(props) {
  return (
    <Form.Group className="mb-3">
      <CloseButton
        className="closeBtn"
        onClick={(e) => props.deleteQuestion(e, props.question._id)}
      />

      <h4>
        Question {props.index + 1}:
        <medium className="text-muted"> Paragraph Response Question</medium>
      </h4>
      <Form.Label>Add Your Question:</Form.Label>
      <Form.Control
        id={props.question._id}
        answer="no"
        onChange={(e) => props.onChange(e)}
        name="paragraph"
        value={props.question.question}
        type="text"
        placeholder="Add Your Question"
      />
    </Form.Group>
  );
}

export function SurveyTitle(props) {
  return (
    <Form.Group className="mb-3">
      <h4>Survey Title and Description</h4>
      <Form.Label>Add a Title to Your Survey</Form.Label>
      <Form.Control
        id={props.survey._id}
        onChange={(e) => props.onChange(e)}
        name="title"
        value={props.survey.title}
        type="text"
        placeholder="Your Survey Title"
      />
      <br />
      <Form.Label>Add a Description to Your Survey</Form.Label>
      <Form.Control
        id={props.survey._id}
        onChange={(e) => props.onChange(e)}
        name="description"
        value={props.survey.description}
        type="text"
        placeholder="Your Survey Description"
      />
    </Form.Group>
  );
}
