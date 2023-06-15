import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

import CreateSurvey from "./components/Survey/CreateSurvey";
import DisplaySurvey from "./components/Survey/DisplaySurvey";
import DisplaySurveyList from "./components/Survey/DisplaySurveyList";
import DisplayResult from "./components/Survey/DisplayResult";
import { NotFound } from "./pages/NotFound";

import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/boilerplate/Header";
import "react-toastify/dist/ReactToastify.css";

import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.auth);
  const [currentSurveyId, setCurrentSurveyId] = useState(null);
  const [error, setError] = useState(false);

  const sendSurveyId = (id) => {
    setCurrentSurveyId(id);
  };

  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />}>
              <Route
                path="dashboard"
                element={
                  <DisplaySurveyList
                    id={user !== null && user.id}
                    sendSurveyId={sendSurveyId}
                  />
                }
              />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/create-survey/*"
              element={
                <CreateSurvey
                  id={user !== null && user.id}
                  surveyId={currentSurveyId}
                  sendSurveyId={sendSurveyId}
                />
              }
            />
            <Route path="/display-results/:id/*" element={<DisplayResult />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
