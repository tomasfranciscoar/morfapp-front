import React, { Component } from "react";
import { Link } from "react-router-dom";

class Recipes extends Component {
  render() {
    const { recipes, searchLabel } = this.props;
    return (
      <div className="Recipes main-container">
        <div className="uk-child-width-1-3@m" uk-grid="true">
          {recipes.map((recipe, i) => (
            <div
              key={i}
              className="uk-card uk-card-default uk-card-hover uk-card-small"
            >
              <div className="uk-card-media-top">
                <Link
                  to={`/recipe/${recipe.recipe.uri.slice(
                    recipe.recipe.uri.indexOf("_") + 1,
                    recipe.recipe.uri.length
                  )}`}
                >
                  <img src={recipe.recipe.image} alt={recipe.recipe.label} />
                </Link>
              </div>
              <div className="uk-card-body">
                <Link
                  to={`/recipe/${recipe.recipe.uri.slice(
                    recipe.recipe.uri.indexOf("_") + 1,
                    recipe.recipe.uri.length
                  )}`}
                >
                  <h3 className="uk-card-title">{recipe.recipe.label}</h3>
                </Link>
                <p>Ingredients:</p>
                <ul>
                  {recipe.recipe.ingredientLines
                    .slice(0, 5)
                    .map((ingredient, i) => (
                      <li key={i}>
                        {ingredient.length <= 30
                          ? ingredient
                          : ingredient.substring(0, 30) + "..."}
                      </li>
                    ))}
                </ul>
              </div>
              <div className="uk-card-footer">
                {recipe.recipe.healthLabels.map((label, i) => (
                  <button
                    key={i}
                    className="uk-button uk-button-primary uk-button-small health-label"
                    name="label"
                    value={label}
                    onClick={searchLabel}
                  >
                    #{label.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Recipes;
