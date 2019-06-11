import React from "react";

const Recipes = ({ recipes, searchLabel }) => (
  <div className="Recipes main-container">
    <div className="uk-child-width-1-3@m" uk-grid="true">
      {recipes.map((recipe, i) => (
        <div className="uk-card uk-card-default uk-card-hover uk-card-small">
          <div className="uk-card-media-top">
            <img src={recipe.recipe.image} alt={recipe.recipe.label} />
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
          <div className="uk-card-footer">
            <p>Health-Labels:</p>
            {recipe.recipe.healthLabels.map(label => (
              <p name="label" value={label} onClick={searchLabel}>#{label.toUpperCase()}  </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Recipes;
