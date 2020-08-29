import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../services/auth-services";
import { withRouter } from "react-router-dom";
import { getProfile } from "../../services/auth-services";

class NavbarWithUser extends Component {
  state = {
    profile: {},
  };

  componentDidMount() {
    getProfile()
      .then((user) => {
        this.setState({ profile: user });
      })
      .catch((error) => error);
  }

  render() {
    const { location } = this.props;
    const { profile } = this.state;
    const id = JSON.parse(localStorage.getItem("USER"))._id;
    return (
      <nav className="uk-navbar-container" uk-navbar="true" uk-sticky="true">
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li className="uk-active navbar-item">
              <Link to="/">HOME</Link>
            </li>
            <li className="navbar-item">
              <Link to="/recipes">RECIPES</Link>
            </li>
            <li className="navbar-item">
              <Link to="/recipes/new">UPLOAD</Link>
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
            <li className="navbar-item">
              <Link to={`/user/${id}`}>
                {profile.name ? profile.name : null}
              </Link>
            </li>
            <li onClick={logout} className="navbar-item">
              <Link to="#">{profile.name ? "Logout" : null}</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(NavbarWithUser);
