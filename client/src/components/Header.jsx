import {
  BsBoxArrowInRight,
  BsBoxArrowInLeft,
  BsFillPersonFill,
} from "react-icons/bs";

import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <header className="header">
        <div className="logo">
          <Link to="/">Survey Admin</Link>
        </div>
        <ul>
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
        </ul>
      </header>
    </div>
  );
}
