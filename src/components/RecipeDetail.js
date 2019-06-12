import React from "react";

const RecipeDetail = () => (
  <div>
    <div className="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin" uk-grid>
    <div className="uk-card-media-left uk-cover-container">
        <img src="images/light.jpg" alt="" uk-cover="true" />
        <canvas width="600" height="400"></canvas>
    </div>
    <div>
        <div className="uk-card-body">
            <h3 className="uk-card-title">Media Left</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
        </div>
    </div>
</div>

  </div>
)

export default RecipeDetail