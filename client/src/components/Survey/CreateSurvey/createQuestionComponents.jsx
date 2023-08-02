import { Form } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";

// ----------------------------Component for adding a new Section--------------------
export function NewSection(props) {
  return (
    <Form.Group
      className="mb-3"
      style={{
        marginTop: 30,
        backgroundColor: "#1193be",
        padding: 20,
        paddingTop: 30,
        borderRadius: 7,
        paddingBottom: 20,
        border: "4px solid #a8d5e3",
        color: "#fff",
        fontSize: 1.4 + "rem",
        position: "relative",
      }}
    >
      <CloseButton
        className="closeBtn"
        variant="white"
        onClick={(e) => props.removeQuestion(e, props.question.id)}
        style={{ position: "absolute", top: 10, right: 10 }}
      />
      <Form.Label style={{ fontWeight: "bold" }}>Add a New Section</Form.Label>
      <Form.Control
        id={props.question._id}
        answer="no"
        onChange={(e) => props.onChange(e)}
        name="short response"
        value={props.question.question}
        type="text"
        placeholder="Your Section Name"
        style={{
          borderRadius: 1,
          color: "#42a4c4",
          fontSize: 1.1 + "rem",
          borderColor: "#008cba",
        }}
      />
    </Form.Group>
  );
}

// ----------------------------Short Response Compoent--------------------
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
        position: "relative",
      }}
    >
      <CloseButton
        className="closeBtn"
        onClick={(e) => props.removeQuestion(e, props.question.id)}
        style={{ position: "absolute", top: 10, right: 10 }}
      />
      <h4>
        Question {props.index + 1}:{" "}
        <medium
          className="text-muted"
          style={{ color: "gray", fontSize: 1.2 + "rem" }}
        >
          Short Reponse Question
        </medium>
      </h4>
      <Form.Label>Add your Question:</Form.Label>
      <Form.Control
        id={props.question._id}
        answer="no"
        onChange={(e) => props.onChange(e)}
        name="short response"
        value={props.question.question}
        type="text"
        placeholder="Add Your Question"
        style={{
          borderRadius: 1,
          color: "#42a4c4",
          fontSize: 1.1 + "rem",
          borderColor: "#008cba",
        }}
      />
    </Form.Group>
  );
}

//-------------------------------------True/False Component---------------------------
export function TrueFalse(props) {
  const answerChoices = props.question.answer_choices.map((answer, index) => (
    <AnswerChoice
      key={index}
      id={props.question._id}
      answernum={index}
      value={answer}
    />
  ));

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
      <CloseButton
        onClick={(e) => props.removeQuestion(e, props.question.id)}
        style={{ position: "absolute", top: 10, right: 10 }}
      />

      <h4>
        Question {props.index + 1}
        <medium
          className="text-muted"
          style={{ color: "gray", fontSize: 1.2 + "rem" }}
        >
          {" "}
          True or False Question
        </medium>
      </h4>
      <Form.Label>Add Your Question:</Form.Label>
      <Form.Control
        id={props.question._id}
        answer="no"
        onChange={(e) => props.onChange(e)}
        name="true/false"
        value={props.question.question}
        type="text"
        placeholder="Add Your Question"
        style={{
          borderRadius: 1,
          color: "#42a4c4",
          fontSize: 1.1 + "rem",
          borderColor: "#008cba",
        }}
      />
      <br />
      {answerChoices}
    </Form.Group>
  );
}

function AnswerChoice(props) {
  return (
    <Form.Control
      id={props.id}
      answer="yes"
      answernum={props.answernum}
      disabled
      name="answerChoice"
      value={props.value}
      type="text"
      placeholder="Add Your Answer Choice"
      style={{
        borderRadius: 1,
        color: "#42a4c4",
        fontSize: 1.1 + "rem",
        borderColor: "#008cba",
        marginBottom: 10,
      }}
    />
  );
}

// ----------------------------Paragraph Component--------------------
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
        position: "relative",
      }}
    >
      <CloseButton
        className="closeBtn"
        onClick={(e) => props.removeQuestion(e, props.question._id)}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          color: "#0c66a9",
        }}
      />

      <h4>
        Question {props.index + 1}:
        <medium
          className="text-muted"
          style={{ color: "gray", fontSize: 1.2 + "rem" }}
        >
          {" "}
          Paragraph Response Question
        </medium>
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
        style={{
          borderRadius: 1,
          color: "#42a4c4",
          fontSize: 1.1 + "rem",
          borderColor: "#008cba",
        }}
      />
    </Form.Group>
  );
}

// ----------------------------Survey Title Component--------------------
export function SurveyTitle(props) {
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
      <h4>Survey Title and Description</h4>
      <Form.Label>Add a Title to Your Survey</Form.Label>
      <Form.Control
        id={props.id}
        onChange={(e) => props.onChange(e)}
        name="title"
        value={props.title}
        type="text"
        placeholder="Your Survey Title"
        style={{
          borderRadius: 1,
          color: "#42a4c4",
          fontSize: 1.1 + "rem",
          borderColor: "#008cba",
        }}
      />
      <br />
      <Form.Label>Add a Description to Your Survey</Form.Label>
      <Form.Control
        id={props._id}
        onChange={(e) => props.onChange(e)}
        name="description"
        value={props.description}
        type="text"
        placeholder="Your Survey Description"
        style={{
          borderRadius: 1,
          color: "#42a4c4",
          fontSize: 1.1 + "rem",
          borderColor: "#008cba",
        }}
      />
    </Form.Group>
  );
}
