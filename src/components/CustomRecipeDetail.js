import React, { Component } from "react";
import { getCustomRecipe } from "../services/recipes-services";

class CustomRecipeDetail extends Component {
  state = {
    customRecipe: {}
  };

  componentWillMount() {
    const { id } = this.props.match.params;
    getCustomRecipe(id)
      .then(recipe => this.setState({ customRecipe: recipe }))
      .catch(err => console.log(err));
  }

  render() {
    const { customRecipe } = this.state;
    return (
      <div className="custom-recipe-detail-container main-container">
        <div
          class="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin"
          uk-grid="true"
        >
          <div className="uk-card-media-left uk-cover-container">
            <img src={customRecipe.images} alt={customRecipe.name} uk-cover="true" />
            <canvas width="600" height="400" />
          </div>
          <div>
            <div className="uk-card-body">
              <h3 className="uk-card-title">{customRecipe.name}</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomRecipeDetail;
