import React, {Component} from "react"

class Profile extends Component{
  render(){
    const user = JSON.parse(localStorage.getItem("USER"))
    return(
      <div>
      <div>Welcome, {user.name}!</div>
      <img src={user.profilePicture} alt={`${user.name}'s profile pic`} style={{width: "200px", borderRadius: "5px"}}/>
      
      </div>
    )
  }
}

export default Profile