import React, { Component } from "react";
import {editProfile} from "../services/auth-services";

class ProfileEdit extends Component {
  state = {
    user: {
      name: JSON.parse(localStorage.getItem("USER")).name,
      lastname: JSON.parse(localStorage.getItem("USER")).lastname,
      username: JSON.parse(localStorage.getItem("USER")).username,
      id: JSON.parse(localStorage.getItem("USER"))._id
    }
  };

  handleChange = e => {
    const { user } = this.state;
    let field = e.target.name;
    user[field] = e.target.value;
    this.setState({ user })
  };

  onEdit = () => {
    const {user} = this.state;
    editProfile(user)
    // .then(user => {
    //   this.props.history.push(`/user/${user.id}`)
    // })
  }

  render() {
    const { name, lastname, username } = this.state.user;
    console.log(this.state);
    return (
      <div className="profile-edit-container main-container">
        <form className="uk-form-stacked">
          <p>
            <input
              className="uk-input uk-form-width-medium"
              type="text"
              name="name"
              value={name}
              onChange={e => this.handleChange(e)}
            />
          </p>

          <p>
            <input
              className="uk-input uk-form-width-medium"
              type="text"
              name="lastname"
              value={lastname}
              onChange={e => this.handleChange(e)}
            />
          </p>

          <p>
            <input
              className="uk-input uk-form-width-medium"
              type="text"
              name="username"
              value={username}
              onChange={e => this.handleChange(e)}
            />
          </p>

          <p>
            <input
              className="uk-input uk-form-width-medium"
              type="file"
              name="profilePicture"
              onChange={e => this.handleChange(e)}
            />
          </p>

          <p>
            <input
              className="uk-button uk-button-primary"
              type="submit"
              value="Edit"
            />
          </p>
        </form>
      </div>
    );
  }
}

export default ProfileEdit;
