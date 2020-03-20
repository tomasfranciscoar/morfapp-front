import React, { Component } from "react";
import { getRecipes } from "../services/recipes-services";
import { Link } from "react-router-dom";

class CustomRecipes extends Component {
  state = {
    customRecipes: [],
    newCustomRecipes: []
  };

  componentWillMount() {
    getRecipes()
      .then(recipes => {
        this.setState({
          customRecipes: recipes.reverse(),
          newCustomRecipes: recipes.reverse()
        });
      })
      .catch(error => console.log(error));
  }

  handleSearch = e => {
    let { search, customRecipes, newCustomRecipes } = this.state;
    search = e.target.value;
    // broken window, must find way to make this piece of code dynamic
    customRecipes = newCustomRecipes.filter(recipe => {
      if (search === "") {
        return newCustomRecipes;
      }
      if (recipe.chips[0].toLowerCase().includes(search.toLowerCase())) {
        return recipe;
      }
      if (recipe.chips[1]) {
        if (recipe.chips[1].toLowerCase().includes(search.toLowerCase())) {
          return recipe;
        }
      }
      if (recipe.chips[2]) {
        if (recipe.chips[2].toLowerCase().includes(search.toLowerCase())) {
          return recipe;
        }
      }
      if (recipe.chips[3]) {
        if (recipe.chips[3].toLowerCase().includes(search.toLowerCase())) {
          return recipe;
        }
      }
      if (recipe.chips[4]) {
        if (recipe.chips[4].toLowerCase().includes(search.toLowerCase())) {
          return recipe;
        }
      }
      if (recipe.chips[5]) {
        if (recipe.chips[5].toLowerCase().includes(search.toLowerCase())) {
          return recipe;
        }
      }
      if (recipe.chips[6]) {
        if (recipe.chips[6].toLowerCase().includes(search.toLowerCase())) {
          return recipe;
        }
      }
      if (recipe.chips[7]) {
        if (recipe.chips[7].toLowerCase().includes(search.toLowerCase())) {
          return recipe;
        }
      }
    });
    this.setState({ customRecipes });
  };

  render() {
    const { customRecipes, search } = this.state;
    let revRecipes = customRecipes.reverse();
    return (
      <div className="custom-recipes-container main-container">
        <h2>USERS' RECIPES</h2>
        <input
          type="search"
          value={search}
          onChange={this.handleSearch}
          placeholder="Search by ingredient"
          className="uk-input uk-form-width-large search-custom-recipes"
        />
        <div className="uk-child-width-1-3@m uk-grid-match" uk-grid="true">
          {revRecipes.map((recipe, i) => (
            <div key={i}>
              <div className="uk-card uk-card-default">
                <div className="uk-card-media-top">
                  <img
                    src={recipe.images ? recipe.images : null}
                    alt={recipe.name}
                  />
                </div>
                <div className="uk-card-body">
                  <Link to={`/recipe/${recipe._id}`}>
                    <h3 className="uk-card-title">{recipe.name}</h3>
                  </Link>
                  <div className="custom-recipe-card-text">
                    <h5>INGREDIENTS:</h5>
                    <ul>
                      {recipe.chips.map(chip => (
                        <li>{chip}</li>
                      ))}
                    </ul>
                    <h5>INSTRUCTIONS:</h5>
                    <p>{recipe.instructions}</p>
                  </div>
                </div>
                <div className="uk-card-footer">
                  Difficulty: {recipe.difficulty}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CustomRecipes;
