import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signup } from "../../services/auth-services";

class Signup extends Component {
  state = {
    auth: {
      name: "",
      lastname: "",
      email: "",
      username: "",
      password: ""
    }
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { auth } = this.state;
    if (!auth.email.length) {
      return this.setState({ error: "You must enter an email" });
    }
    this.onSignup();
  };

  onSignup = () => {
    const { auth } = this.state;
    signup(auth)
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
    const { auth } = this.state;
    let field = e.target.name;
    auth[field] = e.target.value;
    this.setState({ auth });
  };

  render() {
    const {name, lastname, email, username, password} = this.state.auth
    const { error } = this.state;
    return (
      <div className="custom-form main-container small-site">
        <h5>SIGN UP</h5>
        <form className="uk-form-stacked" onSubmit={this.handleFormSubmit}>
          <p>
            <input
              className="uk-input uk-form-width-medium"
              placeholder="First Name"
              type="text"
              name="name"
              value={name}
              onChange={e => this.handleChange(e)}
            />
          </p>

          <p>
            <input
              className="uk-input uk-form-width-medium"
              placeholder="Last Name"
              type="text"
              name="lastname"
              value={lastname}
              onChange={e => this.handleChange(e)}
            />
          </p>

          <p>
            <input
              className="uk-input uk-form-width-medium"
              placeholder="E-mail"
              type="email"
              name="email"
              value={email}
              onChange={e => this.handleChange(e)}
            />
          </p>

          <p>
            <input
              className="uk-input uk-form-width-medium"
              placeholder="Username"
              type="text"
              name="username"
              value={username}
              onChange={e => this.handleChange(e)}
            />
          </p>

          <p>
            <input
              className="uk-input uk-form-width-medium"
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={e => this.handleChange(e)}
            />
          </p>
          <p className="uk-alert-danger">(Password must be at least 8 characters long)</p>
          
          {error && (
                <div className="uk-alert-danger" uk-alert="true">
                    <p>{error}</p>
                </div>
            )}

          <p>
            <input
              className="uk-button uk-button-primary"
              type="submit"
              value="Signup"
            />
          </p>
        </form>

        <p>
          Already have an account?
          <Link to={"/login"}> Login</Link>
        </p>
      </div>
    );
  }
}

export default Signup;
