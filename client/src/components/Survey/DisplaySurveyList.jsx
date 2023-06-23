import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  Container,
  Col,
  Row,
  Button,
  Spinner,
  Card,
} from "react-bootstrap";

// Use to get currnet user information
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";

const DisplaySurveyList = (props) => {
  const [userData, setUserData] = useState(null);
  const [responseCount, setResponseCount] = useState(0);
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
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src="https://i.pinimg.com/564x/76/1e/4e/761e4e53c11d254fbd67b5211c5316ba.jpg"
          />
          <Card.Body>
            <Card.Title>{survey.title}</Card.Title>
            <Card.Text>{survey.description}------</Card.Text>
            <Button variant="primary">
              <Link
                to={`/create-survey/${survey._id}`}
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Edit Survey
              </Link>
            </Button>
          </Card.Body>
        </Card>

        // <tr key={index}>
        //   <th className="dashboardTableLarge">
        //     <Link
        //       to={`/create-survey/${survey._id}`}
        //       style={{ textDecoration: "none", fontFamily: "Nokora" }}
        //     >
        //       {survey.title}
        //     </Link>
        //   </th>
        //   <th className="dashboardTableSmall">
        //     <Link
        //       className="linkSmall"
        //       to={`/display-survey/${survey._id}`}
        //       target="_blank"
        //       style={{ textDecoration: "none", fontFamily: "Nokora" }}
        //     >
        //       ទៅកាន់ការស្ទង់មតិ
        //     </Link>
        //   </th>
        //   <th className="dashboardTableSmall">
        //     <Link
        //       className="linkSmall"
        //       to={`/display-results/${survey._id}`}
        //       style={{ textDecoration: "none", fontFamily: "Nokora" }}
        //     >
        //       ទទួលបាន ({survey.responseTotal}) ការឆ្លើយតប
        //     </Link>
        //   </th>
        // </tr>
      ));
      setTableItems(items);
    }
  }, [surveyList]);

  const onCreateSurveyClick = () => {
    // props.sendSurveyId(null);
    navigate("/create-survey");
  };

  return (
    <>
      <main
        className="main"
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
              style={{ fontSize: 1.5 + "rem", fontWeight: "normal", margin: 0 }}
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
            <Col sm={12} lg={12} style={{ padding: 15, textAlign: "left" }}>
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
                  backgroundColor: "#0c66a9",
                  borderColor: "#0c66a9",
                }}
              >
                <FaPlus /> Create a New Survey
              </Button>
              <br />
              <br />
            </Col>
          </Row>
        </Container>
      </main>

      {/* Survey Section */}

      <section>
        <Container
          style={{ backgroundColor: "#edf4f5", marginTop: 40, padding: 50 }}
        >
          {tableItems && (
            <Row>
              <Col sm={12} lg={12}>
                <h4
                  style={{
                    textAlign: "left",
                    fontWeight: "normal",
                    color: "#193c96",
                  }}
                >
                  Your Surveys
                </h4>
                <div>
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
      </section>
    </>
  );
};

export default DisplaySurveyList;
