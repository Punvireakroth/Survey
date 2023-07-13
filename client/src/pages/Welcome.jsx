import React from "react";
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
