import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../services/auth-services"

class Profile extends Component {

  state = {
    profile: {}
  }

  componentDidMount(){
    getProfile()
      .then(user => {
        this.setState({profile: user})
      })
      .catch(error => error)
  }

  render() {
    const user = this.state.profile;
    return (
      <div className="profile-container main-container">
        <div>Welcome, {user.name}!</div>
        <img
          src={user.profilePicture}
          alt={`${user.name}'s profile pic`}
          style={{ width: "200px", borderRadius: "5px" }}
        />
        <div>
          <Link to={`/user/edit/${user._id}`}>
          <button className="uk-button uk-button-secondary">Edit Profile</button>
          </Link>
        </div>
        <div>
          <div>
            <h3>My Recipes</h3>
            <ul>
              <li></li>
            </ul>
          </div>
          <div>
            <h3>Favourites</h3>
            <ul>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
