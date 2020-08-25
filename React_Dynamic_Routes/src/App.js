import React, {useState} from "react";

import ReactDOM from "react-dom";
import Navbar from "./layouts/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Logout from "./pages/Logout";
import Faq from "./pages/Faq";
import About from "./pages/About";
import Activate from "./pages/Activate";
import { ProtectedRoute } from "./components/Protected/ProtectedRoute";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter,
} from "react-router-dom";
import LoginForm from "./pages/login/LoginForm";
import Protected from "./components/Protected/ProtectedRoute";
import Signup from "./pages/Signup";
// Contect Api
const { Provider, Consumer } = React.createContext();
const LinksList = [
  {
    Page_Name: "Home",
    Path: "/",
    Icon: "fa fa-eye",
    Img: "fa fa-eye",
    Class: "",
    Exact: true,
    Component_Name: Home,
    Id: 1,
  },
  {
    Page_Name: "Contact Us",
    Path: "/contact",
    Icon: "fa fa-eye",
    Img: "fa fa-eye",
    Class: "",
    Exact: false,
    Component_Name: Contact,
    Id: 2,
  },

  {
    Page_Name: "About ",
    Path: "/about",
    Icon: "fa fa-eye",
    Img: "fa fa-eye",
    Class: "",
    Exact: false,
    Component_Name: About,
    Id: 3,
  },
  {
    Page_Name: "FAQ",
    Path: "/faq",
    Icon: "fa fa-eye",
    Img: "fa fa-eye",
    Class: "",
    Exact: false,
    Component_Name: Faq,
    Id: 4,
  },

  {
    Page_Name: "Logout",
    Path: "/logout",
    Icon: "fa fa-eye",
    Img: "fa fa-eye",
    Class: "",
    Exact: false,
    Component_Name: Logout,
    Id: 6,
  },
];
function App()   {
  
  const [loginStatus, setLoginStatus] = useState(false);
  const chnageLoginStatus = (value) => {setLoginStatus(value)
  console.log("value changed")};

 console.log(loginStatus)
    return (
      <Provider >
      {loginStatus ? (
        <Navbar onChange={(value) => chnageLoginStatus(value)} CompanyName="Test" Links={LinksList} />
         ) : (
            <div></div>
          )} 
        <Switch>
        
          {/* {React.Children.toArray(
              LinksList.map((link) => (
                <Route
                  path={link.Path}
                  exact={link.Exact}
                  key={link.Id}
                  // render={function () {return React.createElement(link.Component_Name)}}
                >
                  <Protected
                    updateloginStatus={this.updateloginStatus.bind(this)}
                    component={function () {
                      return React.createElement(link.Component_Name);
                    }}
                  />
                </Route>
              ))
            )} */}
          <ProtectedRoute onChange={(value) => chnageLoginStatus(value)} path="/home" exact component={Home} />
          <ProtectedRoute onChange={(value) => chnageLoginStatus(value)}  path="/contact" exact component={Contact} />
          <ProtectedRoute onChange={(value) => chnageLoginStatus(value)}  path="/about" exact component={About} />
          <ProtectedRoute onChange={(value) => chnageLoginStatus(value)}  path="/faq" exact component={Faq} />
          <Route onChange={(value) => chnageLoginStatus(value)}  path="/" exact component={LoginForm} />
          <Route onChange={(value) => chnageLoginStatus(value)}  path="/signup" exact component={Signup} />
          <Route
            path="/api/users/activate/:token"
            exact
            render={(props) => <Activate {...props} />}
          />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </Provider>
    );
  }


export default App;