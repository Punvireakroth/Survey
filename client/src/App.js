import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";

import CreateSurvey from "./components/Survey/CreateSurvey";
import DisplaySurvey from "./components/Survey/DisplaySurvey";
import DisplaySurveyList from "./components/Survey/DisplaySurveyList";
import DisplayResult from "./components/Survey/DisplayResult";
import SurveySubmit from "./components/Survey/SurveySubmit";
import NotFound from "./pages/NotFound";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/boilerplate/Header";

// React Global Context
import { useAuthContext } from "./hooks/useAuthContext";

function BasicLayout() {
  const location = useLocation();
  // Check if current path is '/'
  const isHomePage = location.pathname === "/";

  return (
    <>
      {!isHomePage && <Header />}
      <Outlet />
    </>
  );
}

function DisplayResultLayout() {
  return <Outlet />;
}

function App() {
  const { user } = useAuthContext();

  const [currentSurveyId, setCurrentSurveyId] = useState(null);

  const sendSurveyId = (id) => {
    setCurrentSurveyId(id);
  };

  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<BasicLayout />}>
              <Route path="/" element={<Welcome />} />
              <Route
                path="dashboard"
                element={
                  <DisplaySurveyList
                    id={user !== null && user.id}
                    sendSurveyId={sendSurveyId}
                  />
                }
              />
              <Route
                path="create-survey/*"
                element={
                  <CreateSurvey
                    id={user !== null && user._id}
                    surveyId={currentSurveyId}
                    sendSurveyId={sendSurveyId}
                  />
                }
              />
              <Route
                path="create-survey/:id/*"
                element={
                  <CreateSurvey
                    id={user !== null && user._id}
                    surveyId={currentSurveyId}
                    sendSurveyId={sendSurveyId}
                  />
                }
              />
              <Route
                path="/display-results/:id/*"
                element={<DisplayResult />}
              />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/display-survey/" element={<DisplayResultLayout />}>
              <Route
                path=":id"
                element={
                  <DisplaySurvey
                    id={user !== null && user._id}
                    surveyId={currentSurveyId}
                    sendSurveyId={sendSurveyId}
                  />
                }
              />
              <Route path="submit-survey/:id" element={<SurveySubmit />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
