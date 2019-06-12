import React, { Component } from "react";
import NavbarWithUser from "./NavbarWithUser";
import NavbarNoUser from "./NavbarNoUser";

class Navbar extends Component {
  
  checkIfUser = () => {
    let token = window.localStorage.TOKEN;
    return token ? <NavbarWithUser /> : <NavbarNoUser />;
  }

  render() {
    console.log('props desde la navbar: ', this.props)
    console.log('local storash desde la navbar: ', window.localStorage)
    console.log('el state desde la navbar: ', this.state)
    return(
      <div className="Navbar">
        {this.checkIfUser()}
      </div>
    )
  }
}

export default Navbar
