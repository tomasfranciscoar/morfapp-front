import React, { Component } from "react";
import { getRecipes } from "../services/recipes-services";

class CustomRecipes extends Component {
  state = {
    customRecipes: []
  };

  componentWillMount() {
    getRecipes()
      .then(recipes => {
        this.setState({ customRecipes: recipes });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { customRecipes } = this.state;
    console.log(customRecipes)
    return (
      <div className="custom-recipes-container main-container">
        <div className="uk-child-width-1-2@m" uk-grid="true">
          {customRecipes.map((recipe, i) => (
            <div key={i}>
              <div className="uk-card uk-card-default">
                <div className="uk-card-media-top">
                  <img src={recipe.images ? recipe.images[0] : null} alt={recipe.name} />
                </div>
                <div className="uk-card-body">
                  <h3 className="uk-card-title">{recipe.name}</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt.
                  </p>
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
