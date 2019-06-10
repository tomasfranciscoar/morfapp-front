import React from "react";

const Recipes = ({recipes}) => (
  <div className="Recipes main-container">
    {recipes.map(recipe => (
      <div className="uk-child-width-1-2@m" uk-grid="true">
      <div>
        <div className="uk-card uk-card-default">
          <div className="uk-card-media-top">
            <img src="images/light.jpg" alt="" />
          </div>
          <div className="uk-card-body">
            <h3 className="uk-card-title">{recipe.recipe.label}</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
          </div>
        </div>
      </div>
    </div>
    ))}
  </div>
);

export default Recipes;
