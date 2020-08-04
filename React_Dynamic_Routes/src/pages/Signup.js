import React from "react";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

let emails = [];
fetch("http://localhost:3001/api/users/verify/email")
  .then(function (response) {
    return response.json();
  })
  .then(function (responseJson) {
    console.log(responseJson);
    emails = responseJson;
    console.log(emails);
  });

const Email_List = emails;

const schema = yup.object().shape({
  first_name: yup
    .string("First Name must be string")
    .min(5, "First Name must be atleast 5 charachters ")
    .max(14, "First Name must be atmost 14 chrachters ")
    .required("First Name is required"),
  last_name: yup
    .string("Last Name must be string ")
    .min(5, "Last Name must be atleast 5 charachters ")
    .max(14, "Last Name must be atmost 14 chrachters ")
    .required("Last Name is required"),
  email: yup
    .string("Must be a valid email")
    .email()
    .oneOf(Email_List, "Email already taken ")
    .min(8, "Email must be atleast 8 charachters ")
    .max(30, "Email must be atmost 20 chrachters ")
    .required("Email is required"),

  password: yup
    .string("Password must be string ")
    .min(5, "Password must be atleast 5 charachters ")
    .max(14, "Password must be atmost 14 chrachters ")
    .required("Password is required"),
  username: yup
    .string("Username must be string ")
    .min(5, "Username must be atleast 5 charachters ")
    .max(14, "Username must be atmost 14 chrachters ")
    .required("Username is required"),
  //last_name: yup.number().positive().integer().required(),
});
export default function Signup(props) {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const routeChange = () => {
    let path = `/login`;
    props.history.push(path);
  };
  const addUser = (data) => {
    let first_name = data.first_name;
    let last_name = data.last_name;
    let email = data.email;
    let username = data.username;
    let password = data.password;

    fetch("http://localhost:3001/api/users/add", {
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
        } else {
          console.log("failed");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const submit = (data) => {
    console.log(data);
    addUser(data);
  };
  return (
    <div className="row">
      <div className="col-md-4"></div>
      <div className="col-md-4 p-5 ">
        <form onSubmit={handleSubmit(submit)}>
          <div className="card">
            <div className="card-header text-center bg-warning">
              <h4 className=" font-weight-bold">Sign Up ! Free MemberShip </h4>
              <button
                className="btn btn-info btn-sm "
                onClick={routeChange}
                type="button"
              >
                Login
              </button>
            </div>
            <div className="card-body p-5">
              <div className="form-row">
                <input
                  type="text"
                  name="first_name"
                  className="form-control mt-3"
                  ref={register}
                  placeholder="first name"
                />
                {errors.first_name && (
                  <small className="text-info font-weight-bold">
                    {errors.first_name?.message}
                  </small>
                )}
              </div>
              <div className="form-row">
                <input
                  type="text"
                  name="last_name"
                  className="form-control mt-3"
                  ref={register}
                  placeholder="last name"
                />
                {errors.last_name && (
                  <small className="text-info font-weight-bold">
                    {errors.last_name?.message}
                  </small>
                )}
              </div>
              <div className="form-row">
                <input
                  type="text"
                  name="email"
                  className="form-control mt-3"
                  ref={register}
                  placeholder="email"
                />
                {errors.email && (
                  <small className="text-info font-weight-bold">
                    {errors.email?.message}
                  </small>
                )}
              </div>
              <div className="form-row">
                <input
                  type="text"
                  name="username"
                  className="form-control mt-3"
                  ref={register}
                  placeholder="username"
                />
                {errors.username && (
                  <small className="text-info font-weight-bold">
                    {errors.username?.message}
                  </small>
                )}
              </div>
              <div className="form-row">
                <input
                  type="password"
                  name="password"
                  className="form-control mt-3"
                  ref={register}
                  placeholder="password"
                />
                {errors.password && (
                  <small className="text-info font-weight-bold">
                    {errors.password?.message}
                  </small>
                )}
              </div>
              <div className="  flex-row justify-content-center  align-items-center mt-5">
                <input type="checkbox" className=" " name="agree" id="agree" />
                <small className="text-info font-weight-bold ml-3">
                  {" "}
                  i agree to terms and conditions{" "}
                </small>
              </div>
            </div>
            <div className="card-footer text-center">
              <input
                type="submit"
                className="btn btn-sm btn-success"
                name="submit"
              />
            </div>
          </div>
        </form>
      </div>
      <div className="col-md-4"></div>
    </div>
  );
}
