import React, { Component } from "react";
import { uploadRecipe } from "../services/recipes-services";
import Swal from "sweetalert2";
import Chips, { Chip } from "react-chips";

class RecipeForm extends Component {
  state = {
    recipe: {
      name: "",
      difficulty: "",
      images: []
    },
    recipes: [],
    chips: []
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

  handleChips = chips => {
    this.setState({ chips });
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
    const { recipe, chips } = this.state;
    if (
      recipe.name.length === 0 ||
      chips.length === 0 ||
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
    let { name, instructions } = this.state.recipe;
    const { error, chips } = this.state;

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
              <Chips
                className="uk-input uk-form-width-medium"
                name="chips"
                value={chips}
                placeholder="Ingredients"
                onChange={this.handleChips}
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
