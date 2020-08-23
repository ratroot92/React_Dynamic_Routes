import React from "react";

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
class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateloginStatus = this.updateloginStatus.bind(this);
    this.state = {
      isLoggedIn: false,
    };
  }

  updateloginStatus = (status) => {
    this.setState({ isLoggedIn: status }, () => {
      console.log("this.setState function called");
    });
  };

  render() {
    const { isLoggedIn } = this.state;

    // localStorage.clear();
    return (
      <Provider value={this.state}>
        {/* {isLoggedIn ? ( */}
        <Navbar CompanyName="Test" Links={LinksList} />
        {/* ) : (
            <div></div>
          )} */}
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
          <ProtectedRoute path="/home" exact component={Home} />
          <ProtectedRoute path="/contact" exactcomponent={Contact} />
          <ProtectedRoute path="/about" exact component={About} />
          <ProtectedRoute path="/faq" exact component={Faq} />
          <Route path="/" exact component={LoginForm} />
          <Route path="/signup" exact component={Signup} />
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
}

export default App;
