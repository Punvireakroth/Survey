import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
// React Bootstrap component
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div id="login-background">
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            {/* <div className="border border-3 border-primary"></div> */}
            <Card className="shadow" style={{ padding: 20 }}>
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase">ISI Survey</h2>
                  <p className="mb-5">Please enter your login and password</p>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          style={{ padding: 0.7 + "rem" }}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label className="text-center">
                          Password
                        </Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Enter password"
                          style={{ padding: 0.7 + "rem" }}
                        />
                      </Form.Group>

                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Login
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
                          Sign Up
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
  // return (
  //   <form onSubmit={handleSubmit}>
  //     <h3>Log in</h3>
  //     <label>Email: </label>
  //     <input
  //       type="email"
  //       onChange={(e) => setEmail(e.target.value)}
  //       value={email}
  //     />

  //     <label>Password: </label>
  //     <input
  //       type="password"
  //       onChange={(e) => setPassword(e.target.value)}
  //       value={password}
  //     />

  //     <button disabled={isLoading}>Login</button>
  //     {error && <div>{error}</div>}
  //   </form>
  // );
};

export default Login;
