import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./Auth";

export const ProtectedRoute = ({ component: Component, onChange, ...rest }) => {
  let User = JSON.parse(localStorage.getItem("logged_user"));
  if (User == null) {
    onChange(false);
    console.log("NO USER LOGGED  -- PROTECTED ROUTE");
  } else {
    onChange(true);
    console.log("USER LOGGED IN -- PROTECTED ROUTE ");
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
