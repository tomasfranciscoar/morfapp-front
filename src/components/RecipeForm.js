import React, { Component } from "react";
import { uploadRecipe } from "../services/recipes-services";
import Swal from "sweetalert2";

class RecipeForm extends Component {
  state = {
    recipe: {
      name: "",
      ingredient1: "",
      difficulty: "",
      images: []
    },
    recipes: []
  };

  handleChange = e => {
    const { recipe } = this.state;
    let field = e.target.name;
    if (e.target.files) {
      recipe.images = e.target.files;
      return this.setState({ recipe });
    }
    recipe[field] = e.target.value;
    this.setState({ recipe });
  };

  showSecondIngredient = () => {
    const second = document.getElementsByClassName("second");
    second[0].setAttribute("style", "display: inline");
    second[1].setAttribute("style", "display: inline");
  };

  showThirdIngredient = () => {
    const third = document.getElementsByClassName("third");
    third[0].setAttribute("style", "display: inline");
    third[1].setAttribute("style", "display: inline");
  };

  showFourthIngredient = () => {
    const fourth = document.getElementsByClassName("fourth");
    fourth[0].setAttribute("style", "display: inline");
    fourth[1].setAttribute("style", "display: inline");
  };

  showFifthIngredient = () => {
    const fifth = document.getElementsByClassName("fifth");
    fifth[0].setAttribute("style", "display: inline");
  };
  handleFormSubmit = e => {
    e.preventDefault();
    const { recipe } = this.state;
    if (
      recipe.name.length === 0 ||
      recipe.ingredient1.length === 0 ||
      recipe.difficulty.length === 0
    ) {
      return this.setState({ error: "You must complete every field" });
    }
    this.onUpload();
  };

  onUpload = () => {
    let { recipe } = this.state;
    const formData = new FormData();
    if (recipe.images) {
      for (let image of recipe.images) {
        formData.append("images", image);
      }
    }

    for (let key in recipe) {
      formData.append(key, recipe[key]);
      console.log(key, recipe[key]);
    }

    if (localStorage.length) {
      formData.append("author", JSON.parse(localStorage.getItem("USER"))._id);
    }

    uploadRecipe(formData)
      .then(rec => {
        console.log("recipe upload successful! ", rec);
        Swal.fire({
          title: "Success!",
          text: "Your recipe has been successfully uploaded",
          type: "success",
          confirmButtonText: "Cool"
        });
        this.props.history.push(`/recipe/${rec._id}`);
      })
      .catch(error => {
        return this.setState({ error: error.message });
      });
  };

  render() {
    let {
      name,
      instructions,
      ingredient1,
      ingredient2,
      ingredient3,
      ingredient4,
      ingredient5
    } = this.state.recipe;
    const { error } = this.state;

    return (
      <div className="custom-form main-container small-site">
        <h5>UPLOAD RECIPE</h5>
        <form onSubmit={this.handleFormSubmit} className="uk-form-stacked">
          <p>
            <input
              className="uk-input uk-form-width-medium"
              name="name"
              value={name}
              placeholder="Title"
              onChange={this.handleChange}
            />
          </p>
          <p>
            <div>
              <input
                className="uk-input uk-form-width-medium"
                name="ingredient1"
                value={ingredient1}
                placeholder="Ingredients"
                onChange={this.handleChange}
              />
              <button
                className="uk-button uk-button-primary"
                type="button"
                onClick={this.showSecondIngredient}
              >
                +
              </button>
            </div>
            <div>
              <input
                className="uk-input uk-form-width-medium second"
                name="ingredient2"
                value={ingredient2}
                placeholder="Ingredients"
                onChange={this.handleChange}
                style={{ display: "none" }}
              />
              <button
                className="uk-button uk-button-primary second"
                type="button"
                onClick={this.showThirdIngredient}
                style={{ display: "none" }}
              >
                +
              </button>
            </div>
            <div>
              <input
                className="uk-input uk-form-width-medium third"
                name="ingredient3"
                value={ingredient3}
                placeholder="Ingredients"
                onChange={this.handleChange}
                id="ingredient3"
                style={{ display: "none" }}
              />
              <button
                className="uk-button uk-button-primary third"
                type="button"
                onClick={this.showFourthIngredient}
                style={{ display: "none" }}
              >
                +
              </button>
            </div>
            <div>
              <input
                className="uk-input uk-form-width-medium fourth"
                name="ingredient4"
                value={ingredient4}
                placeholder="Ingredients"
                onChange={this.handleChange}
                id="ingredient4"
                style={{ display: "none" }}
              />
              <button
                className="uk-button uk-button-primary fourth"
                type="button"
                onClick={this.showFifthIngredient}
                style={{ display: "none" }}
              >
                +
              </button>
            </div>
            <div>
              <input
                className="uk-input uk-form-width-medium fifth"
                name="ingredient5"
                value={ingredient5}
                placeholder="Ingredients"
                onChange={this.handleChange}
                id="ingredient5"
                style={{ display: "none" }}
              />
            </div>
          </p>
          <p>
            <textarea
              className="uk-textarea uk-form-width-medium"
              name="instructions"
              value={instructions}
              placeholder="Instructions"
              onChange={this.handleChange}
            />
          </p>
          <p>
            <select
              onChange={this.handleChange}
              name="difficulty"
              className="uk-select uk-form-width-medium"
            >
              <option selected={true} disabled={true}>
                Difficulty level
              </option>
              <option value="Beginner">Beginner</option>
              <option value="Amateur">Amateur</option>
              <option value="Semi-Pro">Semi-Pro</option>
              <option value="Professional">Professional</option>
              <option value="World Class">World Class</option>
            </select>
          </p>
          <p>
            <input
              className="uk-input uk-form-width-large"
              placeholder="Images"
              type="file"
              name="images"
              onChange={this.handleChange}
            />
          </p>

          {error && (
            <div className="uk-alert-danger" uk-alert="true">
              <p>{error}</p>
            </div>
          )}

          <p>
            <input type="submit" className="uk-button uk-button-primary" />
          </p>
        </form>
      </div>
    );
  }
}

export default RecipeForm;
