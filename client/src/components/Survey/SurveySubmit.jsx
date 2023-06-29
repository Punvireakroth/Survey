import { useParams, useNavigate } from "react-router-dom";
import { Button, Col, Image, Row } from "react-bootstrap";
import ThankYouImage from "../../assets/ThankYou.png";

export default function SurveySubmit() {
  let navigate = useNavigate();
  let { id } = useParams();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Col
        xs={{ span: 10, offset: 1 }}
        sm={{ span: 8, offset: 2 }}
        md={{ span: 6, offset: 3 }}
        lg={{ span: 4, offset: 4 }}
        xl={{ span: 4, offset: 4 }}
      >
        <Row className="justify-content-center">
          <div style={{ marginBottom: 20 }}>
            <Image src={ThankYouImage} />
          </div>
        </Row>
        <Row className="justify-content-center">
          <h1 style={{ color: "#0c66a9", marginBottom: 20 }}>
            Thank you for your response!
          </h1>
          <p style={{ fontSize: 1.2 + "rem", color: "#008cba" }}>
            Click on Submit Another Response,
            <br />
            If you wish to Submit another Survey{" "}
          </p>
        </Row>
        <Button
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#ffffff",
            paddingTop: 7,
            paddingBottom: 7,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 50,
            color: "#0c66a9",
            borderColor: "#008cba",
            borderWidth: 2.9,
          }}
          onClick={() => navigate(`/display-survey/${id}`)}
        >
          Submit another response
        </Button>
      </Col>
    </div>
  );
}
