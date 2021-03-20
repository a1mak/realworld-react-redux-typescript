import {
  selectCurrentUser,
  selectUserRequestStatus,
} from "features/Authentication/authSlice";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const NavBar: FC = () => {
  const currentUser = useSelector(selectCurrentUser);
  const status = useSelector(selectUserRequestStatus);

  const userMenu = () => {
    if (status === "success" && currentUser) {
      return (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to="/create-post">
              <i className="ion-compose"></i>&nbsp;New Post
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/settings">
              <i className="ion-gear-a"></i>&nbsp;Settings
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to={`/profile/${currentUser.username}`}
            >
              {currentUser.username}
            </NavLink>
          </li>
        </>
      );
    } else if (status !== "loading" && !currentUser) {
      return (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Sign In
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              Sign up
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <li className="nav-item">
          <span className="nav-link">Loading...</span>
        </li>
      );
    }
  };
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/">
              Home
            </NavLink>
          </li>
          {userMenu()}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
