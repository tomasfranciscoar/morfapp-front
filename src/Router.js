import React from "react";
import { Switch, Route } from "react-router-dom";

// Components
import Navbar from "./components/common/Navbar";
import Home from "./components/Home";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import RecipeForm from "./components/RecipeForm";
import CustomRecipes from "./components/CustomRecipes";

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
  }

  getTheUser = userObj => {
    this.setState({ loggedInUser: userObj });
  };

  render() {
    let { loggedInUser } = this.state;
    return (
      <div className="Router">
        <Navbar isLogged={loggedInUser} />
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route
            exact
            path="/recipe/:id"
            render={props => <RecipeDetail {...props} />}
          /> */}
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
          <Route exact path="/recipe/new" component={RecipeForm}/>
          <Route exact path="/recipe" component={CustomRecipes} />
        </Switch>
      </div>
    );
  }
}

export default Router;
