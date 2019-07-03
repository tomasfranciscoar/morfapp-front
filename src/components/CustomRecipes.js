import React, { Component } from "react";
import { getRecipes } from "../services/recipes-services";
import { Link } from "react-router-dom";

class CustomRecipes extends Component {
  state = {
    customRecipes: [],
    newCustomRecipes: []
  };

  componentWillMount() {
    getRecipes()
      .then(recipes => {
        this.setState({ customRecipes: recipes.reverse(), newCustomRecipes: recipes.reverse() });
      })
      .catch(error => console.log(error));
  };

  handleSearch = e => {
    let { search, customRecipes, newCustomRecipes } = this.state;
    search = e.target.value;
    console.log(search)
    customRecipes = newCustomRecipes.filter(recipe => {
      // var object = []
      // object.push(Object.values(recipe))
      // object.map(item => {
      //   if(item.includes(search)){
      //     return true
      //   }
      // })
      if (Object.values(recipe).indexOf(search) > -1) {
        return true
     }
      if (search === ""){
        return newCustomRecipes
      }
    })
    // customRecipes = newCustomRecipes.filter(recipe => Object.values(recipe).map(item => item.includes(search)))
    this.setState({ customRecipes })
  }

  render() {
    const { customRecipes, search } = this.state;
    return (
      <div className="custom-recipes-container main-container">
        <h2>USERS' RECIPES</h2>
        <input type="search" value={search} onChange={this.handleSearch} placeholder="Search..." className="uk-input uk-form-width-large search-custom-recipes" />
        <div className="uk-child-width-1-3@m uk-grid-match" uk-grid="true">
          {customRecipes.map((recipe, i) => (
            <div key={i}>
              <div className="uk-card uk-card-default">
                <div className="uk-card-media-top">
                  <img
                    src={recipe.images ? recipe.images : null}
                    alt={recipe.name}
                  />
                </div>
                <div className="uk-card-body">
                  <Link to={`/recipe/${recipe._id}`}>
                    <h3 className="uk-card-title">{recipe.name}</h3>
                  </Link>
                  <div className="custom-recipe-card-text">
                    <h5>INGREDIENTS:</h5>
                    <ul>
                      <li>{recipe.ingredient1}</li>
                      {recipe.ingredient2 ? <li>{recipe.ingredient2}</li> : null}
                      {recipe.ingredient3 ? <li>{recipe.ingredient3}</li> : null}
                      {recipe.ingredient4 ? <li>{recipe.ingredient4}</li> : null}
                      {recipe.ingredient5 ? <li>{recipe.ingredient5}</li> : null}
                    </ul>
                    <h5>INSTRUCTIONS:</h5>
                    <p>{recipe.instructions}</p>
                  </div>
                </div>
                <div className="uk-card-footer">Difficulty: {recipe.difficulty}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CustomRecipes;
