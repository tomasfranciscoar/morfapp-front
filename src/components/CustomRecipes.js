import React, { Component } from "react";
import { getRecipes, deleteCustomRecipe } from "../services/recipes-services";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

class CustomRecipes extends Component {
  state = {
    customRecipes: []
  };

  onDelete = id => {
    deleteCustomRecipe(id)
      .then( () => this.props.history.push("/"))
  }

  componentWillMount() {
    getRecipes()
      .then(recipes => {
        this.setState({ customRecipes: recipes });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { customRecipes } = this.state; 
    return (
      <div className="custom-recipes-container main-container">
        <div className="uk-child-width-1-3@m" uk-grid="true">
          {customRecipes.map((recipe, i) => (
            <div key={i}>
              <div className="uk-card uk-card-default">
                <div className="uk-card-media-top">
                  <img src={recipe.images ? recipe.images[0] : null} alt={recipe.name} />
                </div>
                <div className="uk-card-body">
                  <Link to={`/recipe/${recipe._id}`}>
                  <h3 className="uk-card-title">{recipe.name}</h3>
                  </Link>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt.
                  </p>
                </div>
                <button className="uk-button uk-primary"><span uk-icon="icon: star"></span> Fav</button>
                <button onClick={() => this.onDelete(recipe._id)} className="uk-button uk-danger"><span uk-icon="icon: star"></span> Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CustomRecipes;
