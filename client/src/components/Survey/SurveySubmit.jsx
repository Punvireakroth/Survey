import { Link, useParams, navigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

export function SurveySubmit() {
  let navigate = useNavigate();
  let { id } = useParams();

  return (
    <Card style={{ margin: "auto", width: "40%", marginTop: 20 }}>
      <Card.Header>Thanks for submit survey</Card.Header>
      <Card.Text>
        If you would like to submit another reponse click below button
      </Card.Text>
      <Button
        variant="outline-info"
        onClick={() => navigate(`/display-survey/${id}`)}
      >
        Submit another reponse
      </Button>
    </Card>
  );
}
