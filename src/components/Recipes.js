import React from "react";

const Recipes = ({recipes}) => (
  <div className="Recipes main-container">
    {recipes.map((recipe, i) => (
      <div key={i} className="uk-child-width-1-2@m" uk-grid="true">
      <div>
        <div className="uk-card uk-card-default">
          <div className="uk-card-media-top">
            <img src={recipe.recipe.label} alt={recipe.recipe.label} />
          </div>
          <div className="uk-card-body">
            <h3 className="uk-card-title">{recipe.recipe.label}</h3>
            <p>Ingredients:</p>
            <ul>
              {recipe.recipe.ingredientLines.map(ingredient => (
                <li>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    ))}
  </div>
);

export default Recipes;
