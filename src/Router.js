import React from "react";
import { Switch, Route } from "react-router-dom";

// Components
import Navbar from "./components/common/Navbar";
import Home from "./components/Home";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import RecipeForm from "./components/RecipeForm";
import CustomRecipes from "./components/CustomRecipes";
import CustomRecipeDetail from "./components/CustomRecipeDetail";
import Profile from "./components/Profile";
import ProfileEdit from "./components/ProfileEdit"

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null, customRecipes: [] };
  }

  getTheUser = userObj => {
    this.setState({ loggedInUser: userObj });
  };

  // getTheCustomRecipes = customRec => {
  //   this.setState({ customRecipes: customRec });
  //   console.log('las recetas desde el router: ', this.state.customRecipes)
  // };

  render() {
    let { loggedInUser } = this.state;
    return (
      <div className="Router">
        <Navbar isLogged={loggedInUser} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/recipe/:id" component={CustomRecipeDetail} />
          <Route
            exact
            path="/signup"
            render={props => <Signup {...props} getUser={this.getTheUser} />}
          />
          <Route
            exact
            path="/login"
            render={props => <Login {...props} getUser={this.getTheUser} />}
          />
          <Route exact path="/user/:id" component={Profile} />
          <Route exact path="/user/edit/:id" render={props => <ProfileEdit {...props} />} />
          <Route exact path="/recipes/new" component={RecipeForm} />
          <Route exact path="/recipes" render={props => <CustomRecipes {...props} getRecipe={this.getTheCustomRecipes} />} />
        </Switch>
      </div>
    );
  }
}

export default Router;
