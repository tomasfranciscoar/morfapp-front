import React, { Component } from "react";
import { Link } from "react-router-dom";
import { login } from "../../services/auth-services";

class Login extends Component {
  state = {
    auth: {
      username: "",
      password: ""
    }
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { auth } = this.state;
    if (auth.username.length === 0) {
      return this.setState({ error: "You must enter a username" });
    }
    this.onLogin();
    console.log('local Storage desde Login.js: ', window.localStorage)
  };

  onLogin = () => {
    const { auth } = this.state;
    console.log('props desde Login.js: ', this.props)
    login(auth)
      .then(({ token, user }) => {
        localStorage.setItem("TOKEN", token);
        localStorage.setItem("USER", JSON.stringify(user));
        this.props.getUser(user);
        this.props.history.push("/");
      })
      .catch(error => {
        return this.setState({ error: error.message });
      });
  };

  handleChange = e => {
    const { auth } = this.state
    let field = e.target.name
    auth[field] = e.target.value
    this.setState({ auth })
  }

  render() {
    const {username, password, error} = this.state.auth;
    return (
      <div className="auth-form main-container">
        <h2>Log In</h2>
        <form className="uk-form-stacked" onSubmit={this.handleFormSubmit}>
          <p>
            <input
              className="uk-input uk-form-width-medium"
              placeholder="Username"
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
          </p>
          <p>
            <input
              className="uk-input uk-form-width-medium"
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </p>
          {error && (
                <div className="uk-alert-danger" uk-alert="true">
                    <p>{error}</p>
                </div>
            )}
          <p>
            <input
              className="uk-button uk-button-primary"
              type="submit"
              value="Login"
            />
          </p>
        </form>
        <p>
          Don't have an account?
          <Link to={"/signup"}> Signup</Link>
        </p>
      </div>
    );
  }
}

export default Login;
