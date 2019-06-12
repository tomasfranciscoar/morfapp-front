import React, { Component } from "react";
import NavbarWithUser from "./NavbarWithUser";
import NavbarNoUser from "./NavbarNoUser";

class Navbar extends Component {
  
  checkIfUser = () => {
    let token = window.localStorage.TOKEN;
    return token ? <NavbarWithUser /> : <NavbarNoUser />;
  }

  render() {
    return(
      <div className="Navbar">
        {this.checkIfUser()}
      </div>
    )
  }
}

export default Navbar
