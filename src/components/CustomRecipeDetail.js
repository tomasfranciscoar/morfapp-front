import React, { Component } from "react";
import {
  getCustomRecipe,
  likeCustomRecipe,
  postComment,
  getComments
} from "../services/recipes-services";
import Swal from "sweetalert2";

class CustomRecipeDetail extends Component {
  state = {
    customRecipe: {
      comment: ""
    },
    comments: [],
    commented: true,
    likes: 0
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    getCustomRecipe(id)
      .then(recipe => this.setState({ customRecipe: recipe }))
      .catch(err => console.log(err));

    getComments(id).then(comments => {
      this.setState({ comments: comments });
      console.log(comments);
    });
  }

  onLike = id => {
    let { likes } = this.state;
    let newLikes = likes + 1;
    likeCustomRecipe(id)
      .then(() => this.setState({ likes: newLikes }))
      .catch(error => console.log(error));
  };

  handleChange = e => {
    const { customRecipe } = this.state;
    let field = e.target.name;
    customRecipe[field] = e.target.value;
    this.setState({ customRecipe });
    console.log(customRecipe);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.handlePostComment();
  };

  handlePostComment = () => {
    const { comment, _id: recipe } = this.state.customRecipe;
    const { commented } = this.state;
    const user = JSON.parse(localStorage.getItem("USER"))._id;
    postComment(comment, user, recipe)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Your comment has been successfully posted",
          type: "success",
          confirmButtonText: "Cool"
        });
        getComments(this.props.match.params.id).then(comments => {
          this.setState({ comments: comments });
          console.log(comments);
        });
      })
      .catch(error => {
        return this.setState({ error: error.message });
      });
  };

  render() {
    const { customRecipe, likes, comments } = this.state;
    return (
      <div className="custom-recipe-detail-container main-container">
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
              name="likes"
              value={likes}
              onClick={() => this.onLike(customRecipe)}
              className="uk-button uk-button-default"
            >
              Likes: {likes}
            </button>
          </div>
        </div>
        <h4>Comments</h4>
        {comments.map((comment, i) => (
          <p key={i}>{comment.comment}</p>
        ))}

        <div className="comment">
          <form onSubmit={this.handleSubmit}>
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
      </div>
    );
  }
}

export default CustomRecipeDetail;
