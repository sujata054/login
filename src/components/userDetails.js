import React, {component} from "react";

export default class UserDetails extends Component {

    componentDidMount(){

        fetch("https://localhost:5000/userData", {
            method: "POST",
      crossDomain: true,
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Conrol-Allow-Origin": "*",
      },
      body: JSON.stringify({
       token: window.localStorage.getItem("token"),
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "userData");
      this.setState({ userData: data.data});
    });
    
  } 

    render(){
        return(
            <div>
                 Name<h1>{this.state.userData.fname}</h1>
                Email<h1>{this.state.userData.email}</h1>
            
            </div>

        );
    }

}