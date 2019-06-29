import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../services/auth-services";
import { getMyRecipes } from "../services/recipes-services";

class Profile extends Component {
  state = {
    profile: {},
    myRecipes: [],
    myFavs: []
  };

  componentDidMount() {
    getProfile()
      .then(user => {
        const favourites = user.favs;
        this.setState({ profile: user, myFavs: favourites });
      })
      .catch(error => error);
    getMyRecipes()
      .then(recipes => {
        this.setState({ myRecipes: recipes.reverse() });
      })
      .catch(error => error);
  }

  render() {
    const user = this.state.profile;
    const { myRecipes, myFavs } = this.state;
    return (
      <div className="profile-container main-container small-site">
        {
          <a href={user.profilePicture} target="_blank">
            <img
              src={user.profilePicture}
              alt={`${user.name}'s profile pic`}
              style={{ width: "200px", borderRadius: "5px" }}
              className="profile-picture"
            />
          </a>
        }
        <div className="edit-profile-button">
          <Link to={`/user/edit/${user._id}`}>
            <button className="uk-button uk-button-secondary uk-button-small">
              Edit Profile
            </button>
          </Link>
        </div>
        <div className="profile-lists-main-container">
          <div className="profile-list-container">
            <h5>MY RECIPES</h5>
            <ul className="profile-list">
              {myRecipes.map((recipe, i) => (
                <Link key={i} to={`/recipe/${recipe._id}`}>
                  <li className="profile-list-item">
                    <div className="profile-list-name">{recipe.name}</div>
                    <img
                      className="profile-list-img"
                      src={recipe.images}
                      alt={recipe.name}
                    />
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div className="profile-list-container">
            <h5>MY FAVS</h5>
            <ul className="profile-list">
              {myFavs.reverse().map((fav, i) => (
                <Link key={i} to={`/recipe/${fav._id}`}>
                  <li className="profile-list-item">
                    <div className="profile-list-name">{fav.name}</div>
                    <img
                      className="profile-list-img"
                      src={fav.images}
                      alt={fav.name}
                    />
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
