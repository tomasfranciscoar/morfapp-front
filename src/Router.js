import React from "react";
import { Switch, Route } from "react-router-dom";

// Components
import Navbar from "./components/common/Navbar";
import Home from "./components/Home";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import RecipeForm from "./components/RecipeForm";
import CustomRecipes from "./components/CustomRecipes";
import CustomRecipeDetail from "./components/CustomRecipeDetail"

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
  }

  getTheUser = userObj => {
    let user = JSON.parse(localStorage.getItem('USER'))
    console.log('el user',user)
    this.setState({ loggedInUser: userObj });
  };

  render() {
    let { loggedInUser } = this.state;
    return (
      <div className="Router">
        <Navbar isLogged={loggedInUser} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/recipe/:id"
            component={CustomRecipeDetail}
          />
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
          <Route exact path="/recipes/new" component={RecipeForm}/>
          <Route exact path="/recipes" component={CustomRecipes} />
        </Switch>
      </div>
    );
  }
}

export default Router;
