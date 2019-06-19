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
    console.log('en el render ', customRecipe.images);
    return (
      <div className="custom-recipe-detail-container main-container">
        <div
          class="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin"
          uk-grid="true"
        >
          <div class="uk-card-media-left uk-cover-container">
            <img src={customRecipe.name} alt="" uk-cover="true" />
            <canvas width="600" height="400" />
          </div>
          <div>
            <div class="uk-card-body">
              <h3 class="uk-card-title">{customRecipe.name}</h3>
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
