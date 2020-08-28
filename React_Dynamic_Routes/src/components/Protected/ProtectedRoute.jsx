import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./Auth";
import Navbar from './../../layouts/Navbar';
const LinksList = [
  {
    Page_Name: "Home",
    Path: "/home",
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
export const ProtectedRoute = ({ component: Component, setLoginStatus, ...rest }) => {
  let User = JSON.parse(localStorage.getItem("logged_user"));
  let Auth=false;
  if (User == null) {    
    console.log("NO USER LOGGED  -- PROTECTED ROUTE");
  } else {
    Auth=true;

    console.log("USER LOGGED IN -- PROTECTED ROUTE ");
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        if (Auth) {
          return (
            <React.Fragment>
            <Navbar
            CompanyName="React Node App"
            Links={LinksList}
          />
          <Component  {...props} />
          </React.Fragment>);
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
