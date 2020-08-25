import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./Auth";

export const ProtectedRoute = ({ component: Component, onChange, ...rest }) => {
  console.log("auth component called ");
  let User = JSON.parse(localStorage.getItem("logged_user"));
  console.log(User == null);
  if (User == null) {
    onChange(false)
    console.log("no user logged")
  } else {
    onChange(true)
    console.log("localtsorage active")
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated()) {
          return <Component {...props} />;
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


