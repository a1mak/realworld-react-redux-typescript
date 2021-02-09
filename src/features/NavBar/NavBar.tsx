import * as React from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar: React.FC = () => {
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
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink className="nav-link" to="/create-post">
              <i className="ion-compose"></i>&nbsp;New Post
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/settings">
              <i className="ion-gear-a"></i>&nbsp;Settings
            </NavLink>
          </li> */}
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              Sign up
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
