import React, { Component } from "react";
import { editProfile } from "../services/auth-services";
import Swal from "sweetalert2";
import {Link} from "react-router-dom"

class ProfileEdit extends Component {
  state = {
    user: {
      name: JSON.parse(localStorage.getItem("USER")).name,
      lastname: JSON.parse(localStorage.getItem("USER")).lastname,
      username: JSON.parse(localStorage.getItem("USER")).username,
      id: JSON.parse(localStorage.getItem("USER"))._id,
      profilePicture: ""
    }
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.onEdit();
  };

  handleChange = e => {
    const { user } = this.state;
    let field = e.target.name;
    if (e.target.files) {
      user.profilePicture = e.target.files;
      return this.setState({ user });
    }
    user[field] = e.target.value;
    this.setState({ user });
  };

  onEdit = () => {
    const { user } = this.state;
    const formData = new FormData();
    if (user.profilePicture) {
      for (let image of user.profilePicture) {
        formData.append("profilePicture", image);
      }
    }

    for (let key in user) {
      formData.append(key, user[key]);
    }

    if (user.profilePicture === "") {
      return this.setState({ error: "You must include a profile picture" });
    }

    editProfile(formData)
      .then(profile => {
        this.setState({ user: profile });
        Swal.fire({
          title: "Success!",
          text: "Your profile has been successfully updated",
          type: "success",
          confirmButtonText: "Cool"
        });
        this.props.history.push(`/user/${profile.id}`);
      })
      .catch(error => console.log(error));
  };

  render() {
    const { name, lastname, username, id } = this.state.user;
    const { error } = this.state;
    return (
      <div className="profile-edit-container main-container custom-form small-site">
        <h5>EDIT PROFILE</h5>
        <form onSubmit={this.handleFormSubmit} className="uk-form-stacked">
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

          {error && (
            <div className="uk-alert-danger" uk-alert="true">
              <p>{error}</p>
            </div>
          )}

          <p>
            <input
              className="uk-button uk-button-primary"
              type="submit"
              value="Edit"
            />
            <Link to={`/user/${id}`}>
              <button type="button" className="uk-button uk-button-secondary" style={{marginLeft: "5px"}}>CANCEL</button>
            </Link>
          </p>
        </form>
      </div>
    );
  }
}

export default ProfileEdit;
