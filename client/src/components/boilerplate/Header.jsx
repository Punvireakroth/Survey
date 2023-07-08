import {
  BsBoxArrowInRight,
  BsBoxArrowInLeft,
  BsFillPersonFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Header() {
  const onLogOut = () => {
    console.log("You are logout");
  };
  return (
    <div>
      <header className="header">
        <div className="logo">
          <Link
            to="/dashboard"
            style={{
              textDecoration: "none",
              fontSize: "1.7rem",
              fontWeight: 600,
              color: "#fff",
            }}
          >
            Admin
          </Link>
        </div>
        <ul>
          <>
            <li>
              <button
                className="btn"
                onClick={onLogOut}
                style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 400 }}
              >
                <BsBoxArrowInLeft /> Logout
              </button>
            </li>
          </>
          <>
            <li>
              <Link to="/login">
                <BsBoxArrowInRight /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <BsFillPersonFill /> Register
              </Link>
            </li>
          </>
        </ul>
      </header>
    </div>
  );
}
