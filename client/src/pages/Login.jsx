// import { BsBoxArrowInRight } from "react-icons/bs";
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { login, reset } from "../features/auth/authSlice";

// import Spinner from "../components/boilerplate/Spinner";

// function Login() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const { email, password } = formData;

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user, isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.auth
//   );

//   useEffect(() => {
//     if (isError) {
//       toast.error(message);
//     }
//     if (isSuccess || user) {
//       navigate("/dashboard");
//     }

//     dispatch(reset());
//   }, [user, isError, isSuccess, message, navigate, dispatch]);

//   const onChange = (e) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     const userData = {
//       email,
//       password,
//     };
//     dispatch(login(userData));
//   };

//   if (isLoading) {
//     return (
//       <div className="loginSpinner">
//         <Spinner />;
//       </div>
//     );
//   }

//   return (
//     <>
//       <section className="heading">
//         <h1>
//           <BsBoxArrowInRight /> Login
//         </h1>
//         <p>Login to your account</p>
//       </section>
//       <section className="form">
//         <form onSubmit={onSubmit}>
//           <div className="form-group">
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               name="email"
//               value={email}
//               placeholder="Enter email"
//               onChange={onChange}
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               name="password"
//               value={password}
//               placeholder="Enter password"
//               onChange={onChange}
//             />
//           </div>

//           <div className="form-group">
//             <button type="submit" className="btn btn-block">
//               Submit
//             </button>
//           </div>
//         </form>
//       </section>
//     </>
//   );
// }

// export default Login;

import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Log in</h3>
      <label>Email: </label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Password: </label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Login</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default Login;
