import React, { Component } from "react";
import {
  getCustomRecipe,
  deleteCustomRecipe,
  postComment,
  getComments,
  getFavs
} from "../services/recipes-services";
import { favCustomRecipe } from "../services/auth-services";
import Swal from "sweetalert2";

class CustomRecipeDetail extends Component {
  state = {
    customRecipe: {
      comment: ""
    },
    comments: [],
    favs: [],
    userFaved: {},
    userId: JSON.parse(localStorage.getItem("USER"))._id
  };

  componentWillUpdate() {}

  componentDidMount() {
    const { id } = this.props.match.params;

    getCustomRecipe(id)
      .then(recipe => this.setState({ customRecipe: recipe }))
      .catch(err => console.log(err));

    getComments(id)
      .then(comments => this.setState({ comments: comments }))
      .catch(err => console.log(err));

    getFavs(id)
      .then(favs => this.setState({ favs: favs }))
      .catch(err => console.log(err));
  }

  onDelete = () => {
    const { id } = this.props.match.params;
    deleteCustomRecipe(id).then(() => {
      Swal.fire({
        title: "Success!",
        text: "Your recipe has been successfully deleted",
        type: "error",
        confirmButtonText: "Cool"
      });
      this.props.history.push("/recipes");
    });
  };

  onFav = e => {
    const { id } = this.props.match.params;
    const favs = e.target.value;
    favCustomRecipe(favs, id)
      .then(user => {
        this.setState({ userFaved: user });
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  handleChange = e => {
    const { customRecipe } = this.state;
    let field = e.target.name;
    customRecipe[field] = e.target.value;
    this.setState({ customRecipe });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.handlePostComment();
  };

  handlePostComment = () => {
    const { comment, _id: recipe } = this.state.customRecipe;
    const user = JSON.parse(localStorage.getItem("USER"))._id;
    postComment(comment, user, recipe)
      .then(() => {
        getComments(this.props.match.params.id).then(comments => {
          this.setState({ comments: comments });
        });
      })
      .catch(error => {
        return this.setState({ error: error.message });
      });
  };

  render() {
    const { customRecipe, userId, comments, favs } = this.state;
    return (
      <div className="custom-recipe-detail-container main-container small-site">
        <div
          className="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin"
          uk-grid="true"
        >
          <div className="uk-card-media-left uk-cover-container">
            <img
              src={customRecipe.images}
              alt={customRecipe.name}
              uk-cover="true"
            />
            <canvas width="600" height="400" />
          </div>
          <div>
            <div className="uk-card-body">
              <h3 className="uk-card-title">{customRecipe.name}</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>
            </div>
            <button
              name="favs"
              type="submit"
              value={userId}
              onClick={this.onFav}
              className="uk-button uk-primary"
            >
              <span uk-icon="icon: star" /> Favs:{" "}
              {favs.users ? favs.users.length : 0}
            </button>
            <button onClick={this.onDelete} className="uk-button uk-danger">
              <span uk-icon="icon: trash" /> Delete
            </button>
          </div>
        </div>
        <div className="comment-input">
          <form onSubmit={this.handleSubmit} className="comment-form">
            <input
              onChange={this.handleChange}
              className="uk-input"
              placeholder="Comment..."
              type="text"
              name="comment"
              value={customRecipe.comment}
            />
            <button className="uk-button uk-button-primary">Comment</button>
          </form>
        </div>
        <div className="comments">
          {comments.map((comment, i) => (
            <div key={i} className="comment">
              <p>
                <strong>{comment.author.username}</strong>: {comment.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CustomRecipeDetail;
