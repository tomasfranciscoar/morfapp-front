import React from "react";

const Recipes = ({ recipes, searchLabel }) => (
  <div className="Recipes main-container">
    <div className="uk-child-width-1-3@m" uk-grid="true">
      {recipes.map((recipe, i) => (
        <div key={i} className="uk-card uk-card-default uk-card-hover uk-card-small uk-padding">
          <div className="uk-card-media-top">
            <img src={recipe.recipe.image} alt={recipe.recipe.label} />
          </div>
          <div className="uk-card-body">
            <h3 className="uk-card-title">{recipe.recipe.label}</h3>
            <p>Ingredients:</p>
            <ul>
              {recipe.recipe.ingredientLines.slice(0, 5).map((ingredient, i) => (
                <li key={i}>{ingredient.length <= 30 ? ingredient : ingredient.substring(0, 30) + "..."}</li>
              ))}
            </ul>
          </div>
          <div className="uk-card-footer">
            {recipe.recipe.healthLabels.map((label, i) => (
              <button key={i} className="uk-button uk-button-primary uk-button-small" name="label" value={label} onClick={searchLabel}>#{label.toUpperCase()}</button>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Recipes;
