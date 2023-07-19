import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

import {
  Container,
  Col,
  Row,
  Button,
  Spinner,
  Card,
  Modal,
} from "react-bootstrap";

import { FaPlus, FaLink, FaDatabase } from "react-icons/fa";

const DisplaySurveyList = (props) => {
  const [userData, setUserData] = useState(null);
  const [responseCount, setResponseCount] = useState(0);
  const [surveyDataCounter, setSurveyDataCounter] = useState(0);
  const [surveyList, setSurveyList] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [surveyIdToDelete, setSurveyIdToDelete] = useState(null);
  const [userRole, setUserRole] = useState("normal");
  const [tableItems, setTableItems] = useState(
    <tr>
      <th>
        <div style={{ textAlign: "center", padding: 20 }}>
          <Spinner animation="border" />
        </div>
      </th>
    </tr>
  );

  // Use to get currnet user information

  const { user } = useAuthContext();

  let navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === "admin") {
      setUserRole("admin");
    }
  }, []);

  // get current user information

  const callApi = useCallback(async (userId) => {
    try {
      const response = await fetch(`/api/surveys/surveys-by-user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const responseData = await response.json();
      if (responseData === "No surveys found") {
        setTableItems(null);
      } else {
        setSurveyList(responseData);
      }
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  });

  useEffect(() => {
    // if user data is truthy make the api call
    if (userData) {
      if (surveyDataCounter === 0) {
        setSurveyDataCounter(1);
        callApi(user._id);
      }
    }
  }, [userData]);

  let total = 0;
  useEffect(() => {
    if (surveyList) {
      surveyList.map((survey) => {
        total += survey.responseTotal;
      });
    }
    setResponseCount(total);
  }, [surveyList]);

  useEffect(() => {
    if (surveyList) {
      let items = surveyList.map((survey, index) => (
        <Card
          style={{
            fontFamily: "Nokora",
            height: 400,
            borderRadius: 20,
            marginBottom: 40,
          }}
        >
          <Card.Header
            as="h6"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="text-muted" style={{ padding: 5, marginLeft: 5 }}>
              ទទួលបាន​ការឆ្លើយតបចំនួន {survey.responseTotal}
            </div>

            {user && user.role === "admin" && (
              <div style={{ display: "flex" }}>
                <Button
                  onClick={() => handleDeleteSurvey(survey._id)}
                  style={{
                    backgroundColor: "#d33c64",
                    paddingTop: 7,
                    paddingBottom: 7,
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderRadius: 50,
                    fontSize: 0.9 + "rem",
                    color: "#fff",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    marginRight: 7,
                    height: 28,
                    width: 70,
                    textDecoration: "none",
                    borderColor: "#d33c64",
                  }}
                >
                  Delete
                </Button>
                <Link to={`/create-survey/${survey._id}`} target="_blank">
                  <Button
                    style={{
                      backgroundColor: "#008cba",
                      paddingTop: 7,
                      paddingBottom: 7,
                      paddingLeft: 20,
                      paddingRight: 20,
                      borderRadius: 50,
                      color: "#fff",
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                      margin: 0,
                      height: 28,
                      width: 50,
                      borderColor: "#008cba",
                      fontSize: 0.9 + "rem",
                      textDecoration: "none",
                    }}
                  >
                    Edit
                  </Button>
                </Link>
              </div>
            )}
          </Card.Header>
          <Card.Body
            style={{
              textAlign: "left",
            }}
          >
            <div style={{ padding: 10 }}>
              <Card.Title as="h2">{survey.title}</Card.Title>
              <Card.Text>
                <hr
                  style={{
                    borderBottom: "none",
                    border: "none",
                    borderTop: "4px dotted #008cba",
                    width: "50%",
                  }}
                />
              </Card.Text>
              {user && user.role === "admin" && (
                <Link
                  to={`/display-results/${survey._id}`}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
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
                      marginTop: 40,
                    }}
                  >
                    See all responses
                  </Button>
                </Link>
              )}
            </div>

            <div>
              <Link
                to={`/display-survey/${survey._id}`}
                target="_blank"
                style={{
                  backgroundColor: "#0c66a9",
                  paddingTop: 7,
                  paddingBottom: 7,
                  paddingLeft: 20,
                  paddingRight: 20,
                  borderRadius: 50,
                  color: "#fff",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  margin: 10,
                  textDecoration: "none",
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                }}
              >
                {user && user.id === "admin"
                  ? "Go to survey"
                  : "ចូលទៅកាន់ការស្ទង់មតិ​​​​​"}{" "}
                &nbsp;
                <FaLink />
              </Link>
            </div>
          </Card.Body>
        </Card>
      ));
      setTableItems(items);
    }
  }, [surveyList]);

  // handle the delete survey
  const handleDeleteSurvey = async (surveyId) => {
    setShowConfirmation(true); // show the confirmation modal
    // Store the surveyId in a separate state variable to access it inside the modal
    setSurveyIdToDelete(surveyId);
  };

  // Confirm delete survey modal
  const handleConfirmDelete = async () => {
    try {
      const reponse = await fetch(`/api/surveys/delete/${surveyIdToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (reponse.ok) {
        const updatedSurveyList = surveyList.filter(
          (survey) => survey._id !== surveyIdToDelete
        );
        setSurveyList(updatedSurveyList);
        console.log("A Survey was deleted it's ID is ", surveyIdToDelete);
        setShowConfirmation(false); // Close the confirmation modal
      } else {
        console.log("Survey not deleted successfully");
      }
    } catch (e) {
      console.log(e.error);
    }
  };

  // Cancel delete survey modal
  const handleCancelDelete = () => {
    setShowConfirmation(false); // Close the confirmation modal
  };

  // Create a new survey
  const onCreateSurveyClick = () => {
    // props.sendSurveyId(null);
    navigate("/create-survey");
  };

  return (
    <>
      {user && user.role === "admin" && (
        <main
          className="container"
          style={{
            borderRadius: 10,
            padding: 50,
            position: "relative",
            backgroundColor: "rgb(237, 244, 245)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 40,
              right: 100,
              width: 190,
              height: 190,
              background: "#008cba",
              borderRadius: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              padding: "20px 10px", // Adjust the padding values
              margin: "0 -10px", // Adjust the margin values
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                fontSize: 4 + "em",
                textAlign: "center",
              }}
            >
              {responseCount}
              <br />
              <p
                style={{
                  fontSize: 1.5 + "rem",
                  fontWeight: "normal",
                  margin: 0,
                }}
              >
                Responses
              </p>
            </p>
          </div>

          <Container className="dashboardbg p-0" fluid>
            <Row
              className={tableItems ? "dashboardTitle" : null}
              style={{ paddingTop: 20 }}
            >
              <Col sm={12} lg={12}>
                <h2
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    color: "#193c96",
                  }}
                >
                  Survey Dashboard
                </h2>
              </Col>
            </Row>
            <Row>
              <Col
                sm={12}
                lg={12}
                style={{ padding: 15, textAlign: "left", marginBottom: 20 }}
              >
                <Button
                  onClick={onCreateSurveyClick}
                  variant="primary"
                  className="createSrvyBtn"
                  style={{
                    borderRadius: 50,
                    borderWidth: 1,
                    backgroundColor: "#1e90ff",
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 40,
                    paddingRight: 40,
                    fontSize: 20,
                    marginRight: 20,
                    backgroundColor: "#0c66a9",
                    borderColor: "#0c66a9",
                  }}
                >
                  <FaPlus /> Create a New Survey
                </Button>

                {
                  <Link
                    to={"/display-data-grid/"}
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant="primary"
                      className="createSrvyBtn"
                      style={{
                        borderRadius: 50,
                        borderWidth: 3,
                        backgroundColor: "#1e90ff",
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 40,
                        paddingRight: 40,
                        fontSize: 20,
                        backgroundColor: "#edf4f5",
                        borderColor: "#0c66a9",
                        color: "#0c66a9",
                      }}
                    >
                      <FaDatabase />
                      &nbsp; Survey Data
                    </Button>
                  </Link>
                }
              </Col>
            </Row>
          </Container>
        </main>
      )}

      {/* If the user role as a normal user display a welcome message  */}
      {user && user.role === "normal" && (
        <main>
          <Container
            style={{
              backgroundColor: "#0c66a9",
              color: "#fff",
              fontFamily: "Nokora",
              paddingTop: 40,
              paddingLeft: 40,
              paddingBottom: 20,
              borderRadius: 10,
            }}
          >
            <h1 style={{ fontSize: 4 + "rem" }}>ស្វាគមន៍មកកាន់ការស្ទង់មតិ</h1>
            <hr className="userLineBreak" />
          </Container>
        </main>
      )}

      {/* Survey Section */}
      <section>
        <Container className={userRole}>
          <h2
            style={{
              textAlign: "left",
              fontWeight: "600",
              color: "#193c96",
              marginLeft: 15,
              marginBottom: 25,
              fontFamily: "Nokora",
            }}
          >
            {user && user.role === "admin"
              ? "Your Surveys"
              : "ការស្ទង់មតិរបស់អ្នក"}
          </h2>
          {tableItems && <Container>{tableItems}</Container>}

          {/* Confirmation Modal */}
          <Modal
            show={showConfirmation}
            onHide={handleCancelDelete}
            centered
            style={{ border: "none" }}
          >
            <Modal.Header closeButton style={{ color: "#0c66a9" }}>
              <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ fontFamily: "Nokora", color: "#008cba" }}>
              <p>តើអ្នកប្រាកដថាចង់លុបការស្ទង់មតិមួយនេះទេ?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={handleCancelDelete}
                style={{
                  backgroundColor: "#008cba",
                  borderColor: "#008cba",
                  borderRadius: 50,
                  borderWidth: 1,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                cancel
              </Button>
              <Button
                style={{
                  backgroundColor: "#d33c64",
                  borderColor: "#d33c64",
                  borderRadius: 50,
                  borderWidth: 1,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
                onClick={handleConfirmDelete}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </section>
    </>
  );
};

export default DisplaySurveyList;
