import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };

  return (
    <div id="login-background">
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card
              className="shadow"
              style={{
                padding: 20,
                borderRadius: 15,
                fontSize: 1.2 + "rem",
                color: "#008cba",
              }}
            >
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2
                    className="fw-bold mb-2 text-uppercase"
                    style={{ color: "#0c66a9" }}
                  >
                    ISI Survey
                  </h2>
                  <p className="mb-5">User Signup</p>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          style={{ padding: 0.7 + "rem", color: "#008cba" }}
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-4"
                        controlId="formBasicPassword"
                      >
                        <Form.Label className="text-center">
                          Password
                        </Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Enter password"
                          style={{ padding: 0.7 + "rem", color: "#008cba" }}
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                        />
                      </Form.Group>

                      <div className="d-grid">
                        <Button
                          disabled={isLoading}
                          type="submit"
                          style={{
                            padding: 0.7 + "rem",
                            fontSize: 1.3 + "rem",
                            backgroundColor: "#0c66a9",
                            borderColor: "#0c66a9",
                          }}
                        >
                          SIGNUP
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0 text-center">
                        Don't have an account?{" "}
                        <a
                          href="/signup"
                          className="text-primary fw-bold"
                          style={{ textDecoration: "none" }}
                        >
                          Login
                        </a>
                      </p>
                    </div>
                    {error && <div className="error">{error}</div>}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;
