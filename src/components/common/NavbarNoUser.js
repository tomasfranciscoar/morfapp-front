import React, {Component} from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class NavbarNoUser extends Component {
  render() {
    const { location } = this.props;
    return (
      <nav className="uk-navbar-container" uk-navbar="true" uk-sticky="true">
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li className="uk-active">
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/signup">UPLOAD RECIPE</Link>
            </li>
          </ul>
        </div>

        {location.pathname === "/" ? (
          <div />
        ) : (
          <div className="uk-navbar-center">
            <Link to="/">
              <img
                src={require("../../images/HatchfulExport-All/logo_transparent copy.png")}
                alt="morfapp-logo"
                style={{ height: "50px" }}
              />
            </Link>
          </div>
        )}

        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            <li className="uk-active">
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(NavbarNoUser);
