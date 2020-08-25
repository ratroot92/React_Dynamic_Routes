import React, { useState } from "react";

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
function App() {
  const [state, setState] = useState(false);
  const changeState = (value) => {
    setState(value);
    console.log("LOGIN STATUS VALUE CHANGE TO == " + state);
  };

  return (
    <Provider>
      {state ? (
        <Navbar
          onChange={(value) => changeState(value)}
          CompanyName="React Node App"
          Links={LinksList}
        />
      ) : (
        <div></div>
      )}
      <Switch>
        <ProtectedRoute
          onChange={(value) => changeState(value)}
          path="/home"
          exact
          component={Home}
        />
        <ProtectedRoute
          onChange={(value) => changeState(value)}
          path="/contact"
          exact
          component={Contact}
        />
        <ProtectedRoute
          onChange={(value) => changeState(value)}
          path="/about"
          exact
          component={About}
        />
        <ProtectedRoute
          onChange={(value) => changeState(value)}
          path="/faq"
          exact
          component={Faq}
        />

        <Route
          path="/"
          component={() => (
            <LoginForm onChange={(value) => changeState(value)} state={state} />
          )}
          exact
        />
        <Route
          onChange={(value) => changeState()}
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
}

export default App;
