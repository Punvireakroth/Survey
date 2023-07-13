import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";

function Welcome() {
  const { user } = useAuthContext();

  return !user ? (
    <>
      <Navigate to="/dashboard" />
    </>
  ) : null;
}

export default Welcome;
