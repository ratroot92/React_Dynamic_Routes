import React, { Component } from "react";
import { Redirect } from "react-router-dom";
function Protected(props) {
  console.log("protected component ");
  const Cmp = props.component;
  var password = console.log(localStorage.getItem("admin"));
  var Auth = false;
  console.log("Auth" + Auth);
  return <div>{Auth ? <Cmp /> : <Redirect to="/login"></Redirect>}</div>;
  //   return (
  //     <div>
  //       <Cmp />
  //     </div>
  //   );
}
export default Protected;
