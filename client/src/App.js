import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { useState } from "react";

import CreateSurvey from "./components/Survey/CreateSurvey";
import DisplaySurvey from "./components/Survey/DisplaySurvey";
import DisplaySurveyList from "./components/Survey/DisplaySurveyList";
import DisplayResult from "./components/Survey/DisplayResult";
import SurveySubmit from "./components/Survey/SurveySubmit";
import NotFound from "./pages/NotFound";

import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/boilerplate/Header";
import "react-toastify/dist/ReactToastify.css";

import { useSelector } from "react-redux";

function BasicLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

function DisplayResultLayout() {
  return <Outlet />;
}

function App() {
  const { user } = useSelector((state) => state.auth);
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
                    id={user !== null && user.id}
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
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
