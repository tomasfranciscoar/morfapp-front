import React from "react";

const RecipeForm = () => (
  <div className="recipe-form main-container">
    <form className="uk-form-stacked">
      <p>
        <input className="uk-input uk-form-width-medium" placeholder="name"/>
      </p>
      <p>
        <textarea className="uk-textarea uk-form-width-medium" placeholder="Ingredients"></textarea>
      </p>
      <p>
        <select className="uk-select uk-form-width-medium">
          <option selected={true} disabled={true}>Difficulty level</option>
          <option>Beginner</option>
          <option>Amateur</option>
          <option>Semi-Pro</option>
          <option>Professional</option>
          <option>World Class</option>
        </select>
      </p>
      <p>
        <input className="uk-input uk-form-width-large" placeholder="Image" type="file" />
      </p>
      <p>
        <input type="submit" className="uk-button uk-button-primary"/>
      </p>
    </form>
  </div>
)

export default RecipeForm