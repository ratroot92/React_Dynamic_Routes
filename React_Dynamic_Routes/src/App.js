import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./layouts/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Logout from "./pages/Logout";
import Faq from "./pages/Faq";
import About from "./pages/About";
import Signup from "./pages/Signup";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter,
} from "react-router-dom";
import Login from "./pages/Login";
import Protected from "./components/Protected/Protected";

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
  render() {
    console.log("ready");
    // localStorage.clear();
    return (
      <React.Fragment>
        <Router>
          <Navbar CompanyName="Test" Links={LinksList} />

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
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
