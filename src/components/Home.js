import React, { Component } from "react";
import { searchRecipe } from "../services/recipes-services";
import Recipes from "./Recipes";

class Home extends Component {
  state = {
    ingredient: "",
    foundRecipes: []
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
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
    console.log("Los ingredientes: ", ingredient);
    setTimeout(() => {
      console.log("Las recetas: ", foundRecipes);
    }, 3000);
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

  render() {
    let { foundRecipes } = this.state;
    return (
      <div className="Home main-container">
        <div className="home-container">
          <img
            src={require("../images/HatchfulExport-All/logo_transparent copy.png")}
            alt="morfapp-logo"
            style={{ width: "450px", marginBottom: "20px" }}
          />
          <form onSubmit={this.handleSubmitSearch}>
            <input
              className="uk-input uk-form-width-large"
              placeholder="Type your available ingredients..."
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
            </p>
          </form>
          {foundRecipes.length ? (
            <Recipes
              recipes={foundRecipes}
              searchLabel={this.handleSearchLabels}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Home;
