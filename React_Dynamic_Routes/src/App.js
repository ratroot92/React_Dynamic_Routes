import React from "react";

import ReactDOM from "react-dom";
import Navbar from "./layouts/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Logout from "./pages/Logout";
import Faq from "./pages/Faq";
import About from "./pages/About";
import Activate from "./pages/Activate";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter,
} from "react-router-dom";
import Login from "./pages/Login";
import Protected from "./components/Protected/Protected";
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
class App extends React.Component {
  state = {
    isLoggedIn: false,
  };
  render() {
    console.log("ready");
    // localStorage.clear();
    return (
      <Provider>
        <Router>
          {this.isLoggedIn ? (
            <Navbar CompanyName="Test" Links={LinksList} />
          ) : (
            <div></div>
          )}
          <Switch>
            {React.Children.toArray(
              LinksList.map((link) => (
                <Route
                  path={link.Path}
                  exact={link.Exact}
                  key={link.Id}

                  // render={function () {return React.createElement(link.Component_Name)}}
                >
                  <Protected
                    component={function () {
                      return React.createElement(link.Component_Name);
                    }}
                  />
                </Route>
              ))
            )}
            <Route path="/login" exact component={Login}></Route>
            <Route path="/signup" exact component={Signup}></Route>
            <Route path="/api/users/activate/:token" exact render={props=><Activate{...props}/>}></Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
