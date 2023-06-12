import React from "react";
import { BsBoxArrowInRight } from "react-icons/bs";

function Login() {
  const onSubmit = () => {};
  const onChange = () => {};
  return (
    <>
      <section className="heading">
        <h1>
          <BsBoxArrowInRight /> Login
        </h1>
        <p>Login to your account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
