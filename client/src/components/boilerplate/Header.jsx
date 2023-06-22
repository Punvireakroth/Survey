import {
  BsBoxArrowInRight,
  BsBoxArrowInLeft,
  BsFillPersonFill,
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogOut = () => {
    if (user) {
      dispatch(logout());
      dispatch(reset());
      navigate("/");
    }
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
          {user ? (
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
          ) : (
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
          )}
        </ul>
      </header>
    </div>
  );
}
