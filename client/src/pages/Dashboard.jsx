// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// import CreateSurvey from "../components/Survey/CreateSurvey";
// import DisplaySurvey from "../components/Survey/DisplaySurvey";
// import DisplaySurveyList from "../components/Survey/DisplaySurveyList";

// function Dashboard() {
//   const navigate = useNavigate();

//   const { user } = useSelector((state) => state.auth);
//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//     }
//   }, [user, navigate]);

//   // State
//   const [view, setView] = useState("displaySurveyList");
//   const [currentSurveyId, setCurrentSurveyId] = useState("");

//   const switchView = (newView) => {
//     setView(newView);
//   };

//   const sendSurveyId = (id) => {
//     setCurrentSurveyId(id);
//   };

//   // Switch Component
//   const renderSwitch = (param) => {
//     switch (param) {
//       case "createSurvey":
//         return (
//           <CreateSurvey
//             id={user.id}
//             switchView={switchView}
//             surveyId={sendSurveyId}
//           />
//         );
//       case "displaySurvey":
//         return (
//           <DisplaySurvey
//             id={user.id}
//             switchView={switchView}
//             surveyId={currentSurveyId}
//           />
//         );
//       case "displaySurveyList":
//         return <DisplaySurveyList id={user.id} switchView={switchView} />;
//       default:
//         return "Survey Dashboard";
//     }
//   };

//   return <>{renderSwitch(view)}</>;
// }

// export default Dashboard;
