import React, {Component} from "react";
import { uploadRecipe } from "../services/recipes-services";

class RecipeForm extends Component {

  state = {
    recipe: {
      name: "",
      ingredients: "",
      difficulty: "",
      image: ""
    }
  }

  handleChange = e => {
    const { recipe } = this.state
    let field = e.target.name
    recipe[field] = e.target.value
    this.setState({ recipe })
  }

  handleFormSubmit = e => {
    e.preventDefault();
    this.onUpload();
  };

  onUpload = () => {
    const {recipe} = this.state;
    uploadRecipe(recipe)
    .then(rec => console.log('recipe upload successful! ', rec))
    .catch(error => console.log(error))
  }

  render() {
    let {name, ingredients, difficulty, image} = this.state.recipe
    return (
      <div className="custom-form main-container">
        <form onSubmit={this.handleFormSubmit} className="uk-form-stacked">
          <p>
            <input
              className="uk-input uk-form-width-medium"
              name="name"
              value={name}
              placeholder="Name"
              onChange={this.handleChange}
            />
          </p>
          <p>
            <textarea
              className="uk-textarea uk-form-width-medium"
              name="ingredients"
              value={ingredients}
              placeholder="Ingredients"
              onChange={this.handleChange}
            />
          </p>
          <p>
            <select onChange={this.handleChange} name="difficulty" className="uk-select uk-form-width-medium">
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
              placeholder="Image"
              type="file"
              name="image"
              onChange={this.handleChange}
            />
          </p>
          <p>
            <input type="submit" className="uk-button uk-button-primary" />
          </p>
        </form>
      </div>
    );
  }
}

export default RecipeForm;
