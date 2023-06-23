import React from "react";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <>
      <div>Click on the links below to login or register</div>
      <Link to={"/login"}>Login</Link>
      <br />
      <Link to={"/register"}>Register</Link>
    </>
  );
}

export default Welcome;
