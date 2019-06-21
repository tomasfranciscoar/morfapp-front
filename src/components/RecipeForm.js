import React, { Component } from "react";
import { uploadRecipe } from "../services/recipes-services";
import Swal from "sweetalert2";

class RecipeForm extends Component {
  state = {
    recipe: {
      name: "",
      ingredients: "",
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
    console.log(recipe)
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.onUpload();
  };

  onUpload = () => {
    let { recipe } = this.state;
    // const user = JSON.parse(localStorage.getItem('USER'))
    const formData = new FormData()
    if(recipe.images) {
      for (let image of recipe.images) {
        formData.append('images', image)
      }
    }
    
    for(let key in recipe) {
      formData.append(key, recipe[key])
      console.log('la key: ', key, recipe[key])
    }
    
    if(localStorage.length){
      formData.append('author', JSON.parse(localStorage.getItem('USER'))._id)
    }

    uploadRecipe(formData)
      .then(
        rec => console.log("recipe upload successful! ", rec),
        Swal.fire({
          title: "Success!",
          text: "Your recipe has been successfully uploaded",
          type: "success",
          confirmButtonText: "Cool"
        }),
        this.props.history.push("/")
      )
      .catch(error => console.log(error));
  };

  render() {
    let { name, ingredients } = this.state.recipe;
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
              multiple
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
