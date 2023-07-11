import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
  Navigate,
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
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<BasicLayout />}>
            <Route path="/" element={<Welcome />} />
            <Route
              path="dashboard"
              element={
                user ? (
                  <DisplaySurveyList
                    id={user !== null && user.id}
                    sendSurveyId={sendSurveyId}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="create-survey/*"
              element={
                user ? (
                  <CreateSurvey
                    id={user !== null && user._id}
                    surveyId={currentSurveyId}
                    sendSurveyId={sendSurveyId}
                  />
                ) : (
                  <Navigate to="/login" />
                )
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
            <Route path="/display-results/:id/*" element={<DisplayResult />} />
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
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="../dashboard" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="../dashboard" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
