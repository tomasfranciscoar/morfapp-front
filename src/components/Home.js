import React, { Component } from "react";
import { searchRecipe } from "../services/recipes-services";
import Recipes from "./Recipes";

class Home extends Component {
  state = {
    ingredient: "",
    foundRecipes: [],
    detailedRecipe: {}
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  clearHome = () => {
    this.setState({
      ingredient: "",
      foundRecipes: [],
      detailedRecipe: {}
    });
  };

  handleSubmitSearch = e => {
    e.preventDefault();
    let { ingredient, foundRecipes } = this.state;
    searchRecipe(ingredient)
      .then(recipes => {
        foundRecipes = recipes;
      })
      .then(() => {
        this.setState({ foundRecipes });
      });
  };

  handleSearchLabels = e => {
    const { value } = e.target;
    let { foundRecipes } = this.state;
    searchRecipe(value)
      .then(recipes => {
        foundRecipes = recipes;
      })
      .then(() => {
        this.setState({ foundRecipes });
      });
  };

  handleShowDetailedRecipe = index => {
    let { detailedRecipe, foundRecipes } = this.state;
    detailedRecipe = foundRecipes[index];
    this.setState({ foundRecipes, detailedRecipe });
  };

  render() {
    let { foundRecipes, detailedRecipe } = this.state;
    console.log(foundRecipes)
    return (
      <div className="Home main-container small-site">
        <div className="home-container">
          <img
            src={require("../images/HatchfulExport-All/logo_transparent copy.png")}
            alt="morfapp-logo"
            style={{ width: "450px", marginBottom: "20px" }}
          />
          <form onSubmit={this.handleSubmitSearch}>
            <input
              className="uk-input uk-form-width-large"
              placeholder="Type your available ingredients!"
              onChange={this.handleChange}
              type="text"
              name="ingredient"
              value={this.state.ingredient}
            />
            <p>
              <input
                className="uk-button uk-button-primary"
                type="submit"
                value="Search!"
              />
              {foundRecipes.length ? <button
                onClick={this.clearHome}
                type="button"
                className="uk-button uk-button-secondary"
                style={{marginLeft: "5px"}}
              >
                CLEAR
              </button> : null}
            </p>
          </form>
          {foundRecipes.length ? (
            <Recipes
              recipes={foundRecipes}
              detailedRecipe={detailedRecipe}
              searchLabel={this.handleSearchLabels}
              showDetailedRecipe={this.handleShowDetailedRecipe}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Home;
