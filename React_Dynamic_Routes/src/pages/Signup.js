import React from "react";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import Form_Sidebar_BackgroundImage from "./../assets/background_1.png";
import Login_Compoenent_BackgroundImage from "./../assets/background_3.jpg";
import Form_BackgroundImage from "./../assets/background_2.jpg";
import "./style.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
/* Validation starts here */
const schema = yup.object().shape({
  first_name: yup
    .string("First Name must be string")
    .required(function(value){
        toast.warning("First name  is required");
    })
    .min(3, function(value){
        toast.warning("First name  must be atleast 3 charachters");
    })
    .max(32, function(value){
        toast.warning("First name  must atmost 32 chrachters");
    }),

  last_name: yup
    .string("Last Name must be string ")
    .required(function(value){
        toast.warning("last name is required");
    })
    .min(3, function(value){
        toast.warning("Last name  must be atleast 3 charachters");
    })
    .max(32, function(value){
        toast.warning("Last name  must atmost 32 chrachters");
    }),

  email: yup
    .string()
    .required(function(value){
        toast.warning("Email is required");
    })
    .email("Invalid email")
    .test("Unique Email", "Email already in use", function (value) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:3001/api/users/verify/email", {
            email: value,
          })
          .then((res) => {
            if (res.data.msg === "Email already been taken") {
               toast.error(res.data.msg);
              resolve(false);
            }
            resolve(true);
          });
      });
    }),

  password: yup
    .string("Password must be string ")
    .required(function(value){
        toast.warning("Password is required");
    })
    .min(3, function(value){
        toast.warning("Password  must be atleast 3 charachters");
    })
    .max(32, function(value){
        toast.warning("Password  must atmost 32 chrachters");
    }),
    
  c_password: yup
    .string()
    .required(function(value){
        toast.warning("Confirm password is required");
    })
    .oneOf([yup.ref("password"), null], function(value){
        toast.warning("Unmatched passwords");
    }),
    // agree:yup.string()
    //  .checked(function(value){
    //     toast.warning("Agree to terms and  conidtions ");
    // }),

  username: yup
    .string("Username must be string ")
    .required(function(value){
        toast.warning("Username is required ");
    })
    .min(3, function(value){
        toast.warning("Username  must be atleast 3 charachters");
    })
    .max(32, function(value){
        toast.warning("Username  must atmost 32 chrachters");
    })
    .test("Unique username", "Username already in taken", function (value) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:3001/api/users/verify/username", {
            username: value,
          })
          .then((res) => {
            if (res.data.msg === "Username already been taken") {
                toast.error(res.data.msg);
              resolve(false);
            }
            resolve(true);
          });
      });
    }),
});
/* Validation ends here */
/* Functional componennet starts here */

export default function Signup(props) {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const routeChange = () => {
    let path = `/login`;
    props.history.push(path);
  };
  const addUser = (data, e) => {
    let first_name = data.first_name;
    let last_name = data.last_name;
    let email = data.email;
    let username = data.username;
    let password = data.password;

    fetch("http://localhost:3001/api/users/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        first_name: first_name,
        last_name: last_name,
        email: email,
        username: username,
        password: password,
      }),
    })
      .then(function (res) {
        console.log(res);
        if (res.status === 200) {
          console.log("success");
          e.target.reset();
          routeChange();
        } else {
          console.log("failed");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const submit = (data, e) => {
    console.log(data);
    addUser(data, e);
  };
  return (
    <div
      className="row signup-component-wrapper"
      style={{
        backgroundImage: "url(" + Login_Compoenent_BackgroundImage + ")",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <ToastContainer />
      <div className="col-md-3"></div>
      <div className="col-md-6 signup-form-wrapper  ">
        <form onSubmit={handleSubmit(submit)}>
          <div className="">
            <div className="text-center w-100 d-flex flex-row justify-content-around align-items-center">
              <h4 className=" font-weight-bold text-white">
                Sign Up ! Free MemberShip{" "}
              </h4>
              <button
                className="btn btn-info btn-sm  "
                onClick={routeChange}
                type="button"
              >
                Login
              </button>
            </div>

            <div className="card-body pl-5 pr-5 pt-5">
              {/* first name  and last name  */}
              <div className="row">
                <div className="col-md-6  ">
                  <div className="w-100 d-flex flex-column justify-content-center align-items-center ">
                    <input
                      type="text"
                      name="first_name"
                      className="form-control custom-signup-firstName-input "
                      ref={register}
                      placeholder="first name"
                    />
                    <div className="text-left   error-container">
                      {errors.first_name && (
                        <small className="text-white font-weight-bold">
                          {errors.first_name?.message}
                        </small>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-md-6 ">
                  <div className="w-100 d-flex flex-column justify-content-center align-items-center ">
                    <input
                      type="text"
                      name="last_name"
                      className="form-control custom-signup-lastName-input  "
                      ref={register}
                      placeholder="last name"
                    />
                    <div className="text-left   error-container">
                      {errors.last_name && (
                        <small className="text-white font-weight-bold">
                          {errors.last_name?.message}
                        </small>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center align-items-center flex-column w-100 ml-auto mx-auto">
                <input
                  type="text"
                  name="email"
                  className="form-control custom-signup-input "
                  ref={register}
                  placeholder="email"
                />
                <div className="text-left   error-container">
                  {errors.email && (
                    <small className="text-white font-weight-bold">
                      {errors.email?.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center flex-column w-100 ml-auto mx-auto">
                <input
                  type="text"
                  name="username"
                  className="form-control custom-signup-input "
                  ref={register}
                  placeholder="username"
                />
                <div className="text-left   error-container">
                  {errors.username && (
                    <small className="text-white font-weight-bold">
                      {errors.username?.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center flex-column w-100 ml-auto mx-auto">
                <input
                  type="password"
                  name="password"
                  className="form-control custom-signup-input "
                  ref={register}
                  placeholder="password"
                />
                <div className="text-left   error-container">
                  {errors.password && (
                    <small className="text-white font-weight-bold">
                      {errors.password?.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center flex-column w-100 ml-auto mx-auto">
                <input
                  type="password"
                  name="c_password"
                  className="form-control custom-signup-input "
                  ref={register}
                  placeholder="confirm password"
                />
                <div className="text-left   error-container">
                  {errors.c_password && (
                    <small className="text-white font-weight-bold">
                      {errors.c_password?.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="  flex-column justify-content-center  align-items-center mt-2">
                <input type="checkbox" className=" " name="agree" id="agree" />
                <small className="text-white font-weight-bold ml-3">
                  {" "}
                  i agree to terms and conditions{" "}
                </small>
              </div>
              <div className="w-100 text-center">
                <button
                  type="submit"
                  className="btn btn-sm btn-success mt-3"
                  name="submit"
                  id="signupBtn"
                >
                  <i className="fa fa-user-plus fa-2x" aria-hidden="true"></i>{" "}
                  <span
                    className="text-white font-weight-bold ml-2"
                    style={{ fontSize: "18px" }}
                  >
                    Sign Up
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="col-md-3"></div>
      
    </div>
    
  );
}
