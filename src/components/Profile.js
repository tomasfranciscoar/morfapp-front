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
    console.log(myFavs);
    return (
      <div className="profile-container main-container small-site">
        <div>Welcome, {user.name}!</div>
        {<a href={user.profilePicture} target="_blank">
        <img
          src={user.profilePicture}
          alt={`${user.name}'s profile pic`}
          style={{ width: "200px", borderRadius: "5px" }}
        />
        </a>}
        <div>
          <Link to={`/user/edit/${user._id}`}>
            <button className="uk-button uk-button-secondary">
              Edit Profile
            </button>
          </Link>
        </div>
        <div className="profile-lists-container">
          <div>
            <h3>My Recipes</h3>
            <ul>
              {myRecipes.map((recipe, i) => (
                <Link key={i} to={`/recipe/${recipe._id}`}>
                  <li>{recipe.name}</li>
                </Link>
              ))}
            </ul>
          </div>
          <div>
            <h3>My Favs</h3>
            <ul>
              {myFavs.map((fav, i) => (
                <Link key={i} to={`/recipe/${fav._id}`}>
                  <li>{fav.name}</li>
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
