import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Container, Col, Row, Button, Spinner } from "react-bootstrap";
// Use to get currnet user information
import { useSelector } from "react-redux";

const DisplaySurveyList = (props) => {
  const [userData, setUserData] = useState(null);
  const [surveyDataCounter, setSurveyDataCounter] = useState(0);
  const [surveyList, setSurveyList] = useState(null);
  const [tableItems, setTableItems] = useState(
    <tr>
      <th>
        <div style={{ textAlign: "center", padding: 20 }}>
          <Spinner animation="border" />
        </div>
      </th>
    </tr>
  );
  let navigate = useNavigate();

  // get current user information
  const { user } = useSelector((state) => state.auth);

  const callApi = useCallback(async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/surveys/surveys-by-user/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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

  useEffect(() => {
    if (surveyList) {
      let items = surveyList.map((survey, index) => (
        <tr key={index}>
          <th className="dashboardTableLarge">
            <Link
              to={`/create-survey/${survey._id}`}
              style={{ textDecoration: "none" }}
            >
              {survey.title}
            </Link>
          </th>
          <th className="dashboardTableSmall">
            <Link
              className="linkSmall"
              to={`/display-survey/${survey._id}`}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              ទៅកាន់ការស្ទង់មតិ
            </Link>
          </th>
          <th className="dashboardTableSmall">
            <Link
              className="linkSmall"
              to={`/display-results/${survey._id}`}
              style={{ textDecoration: "none" }}
            >
              ទទួលបាន ({survey.responseTotal}) ការឆ្លើយតប
            </Link>
          </th>
        </tr>
      ));
      setTableItems(items);
    }
  }, [surveyList]);

  const onCreateSurveyClick = () => {
    // props.sendSurveyId(null);
    navigate("/create-survey");
  };

  return (
    <main
      className="main"
      style={{
        backgroundColor: "rgb(237, 244, 245)",
        borderRadius: 10,
        padding: 50,
      }}
    >
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
              }}
            >
              Survey Dashboard
            </h2>
          </Col>
        </Row>
        <Row>
          <Col sm={12} lg={12} style={{ padding: 15, textAlign: "left" }}>
            <Button
              onClick={onCreateSurveyClick}
              variant="primary"
              className="createSrvyBtn"
              style={{
                borderRadius: 5,
                borderWidth: 1,
                backgroundColor: "#1e90ff",
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 40,
                paddingRight: 40,
                fontSize: 20,
              }}
            >
              Create a New Survey
            </Button>
            <br />
            <br />
          </Col>
        </Row>

        {tableItems && (
          <Row>
            <Col sm={12} lg={12}>
              <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
                Your Surveys
              </h4>
              <div style={{ borderTop: "solid", paddingTop: 8 }}>
                <Table
                  striped
                  bordered
                  hover
                  style={{ width: "50%", textAlign: "center" }}
                >
                  <tbody>{tableItems}</tbody>
                </Table>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </main>
  );
};

export default DisplaySurveyList;
