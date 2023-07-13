import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";
function Welcome() {
  const { user } = useAuthContext();

  return !user ? (
    <>
      <div>Click on the links below to login or register</div>
      <Link to={"/login"}>Login</Link>
      <br />
      <Link to={"/register"}>Register</Link>
    </>
  ) : (
    <Navigate to="/dashboard" />
  );
}

export default Welcome;
