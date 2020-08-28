import React, { Component } from "react";

import Navbar from "./layouts/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Logout from "./pages/Logout";
import Faq from "./pages/Faq";
import About from "./pages/About";
import Activate from "./pages/Activate";
import { ProtectedRoute } from "./components/Protected/ProtectedRoute";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./pages/login/LoginForm";
import Signup from "./pages/Signup";
import {Redirect} from 'react-router-dom';
// Contect Api
const { Provider, Consumer } = React.createContext();
const LinksList = [
  {
    Page_Name: "Home",
    Path: "/",
    Icon: "fa fa-eye",
    Img: "fa fa-eye",
    Class: "font-weight-bold nav-link",
    Id: 1,
  },
  {
    Page_Name: "Contact",
    Path: "/contact",
    Icon: "fa fa-eye",
    Img: "fa fa-eye",
    Class: "font-weight-bold nav-link",

    Id: 2,
  },

  {
    Page_Name: "About",
    Path: "/about",
    Icon: "fa fa-eye",
    Img: "fa fa-eye",
    Class: "font-weight-bold nav-link",
    Id: 3,
  },
  {
    Page_Name: "FAQ",
    Path: "/faq",
    Icon: "fa fa-eye",
    Img: "fa fa-eye",
    Class: "font-weight-bold nav-link mr-5",

    Id: 4,
  },
];


// Component Starts Here 

class App extends React.Component {
  //##################Contructor Start ###################//
  constructor(props){
    super(props);
    this.state={
      userIslogged:false,
    }

  }
    //##################Contructor End ###################//
componentDidMount(){
  let User = JSON.parse(localStorage.getItem("logged_user"));
  console.log(User)
  if (User == null) {    
   this.setState({userIslogged:false})
  } else {
    this.setState({userIslogged:true})

    
  }
}





  //##################Render Start ###################//
  render(){

  const {userIslogged}=this.state
  return (
    <Provider>
     
      <Switch>
        <ProtectedRoute
          path="/home"
          exact
          component={Home}
        />
        <ProtectedRoute
         
          path="/contact"
          exact
          component={Contact}
        />
        <ProtectedRoute
         
          path="/about"
          exact
          component={About}
        />
        <ProtectedRoute 
          path="/faq"
          exact
          component={Faq}
        />
        { userIslogged ? (
        <Redirect to="/home"/>):(<Route
          path="/"
          component={() => (
            <LoginForm   />
          )}
          exact
        />)}
     
       
        <Route
          
          path="/signup"
          exact
          component={Signup}
        />
        <Route
          path="/api/users/activate/:token"
          exact
          render={(props) => <Activate {...props} />}
        />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </Provider>
  );
    //##################Render End  ###################//
}
}

export default App;
