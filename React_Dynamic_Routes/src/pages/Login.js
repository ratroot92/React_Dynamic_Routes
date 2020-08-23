import React from "react";
import { withRouter } from "react-router-dom";
import "./style.css";
import axios from "axios";
import Form_Sidebar_BackgroundImage from "./../assets/background_1.png";
import Login_Compoenent_BackgroundImage from "./../assets/background_3.jpg";
import Form_BackgroundImage from "./../assets/background_2.jpg";
import ClockContainer from "../components/clock/ClockContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import auth from "./../components/Protected/Auth";
//Validation
const schema = yup.object().shape({
  //Username validation

  username: yup
    .string("Username must be string ")
    .required(function (value) {
      toast.warning("Username is required ");
    })
    .min(3, function (value) {
      toast.warning("Username  must be atleast 3 charachters");
    })
    .max(32, function (value) {
      toast.warning("Username  must atmost 32 chrachters");
    })
    .test("Unique username", "Username already in taken", function (value) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:3001/api/users/verify/username", {
            username: value,
          })
          .then((res) => {
            if (!res.data.msg === "Username already been taken") {
              toast.error("User Name doesnot Exist");
              resolve(true);
            }

            resolve(true);
          });
      });
    }),
  //password validation

  password: yup
    .string("Password must be string ")
    .required(function (value) {
      toast.warning("Password is required");
    })
    .min(3, function (value) {
      toast.warning("Password  must be atleast 3 charachters");
    })
    .max(32, function (value) {
      toast.warning("Password  must atmost 32 chrachters");
    }),
});
//End validation
export default class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      pasword: "",
    };
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.routeChange = this.routeChange.bind(this);
  }
  onChange(e) {}
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  routeChange = () => {
    let path = `/signup`;
    this.props.history.push(path);
  };

  submitForm(e) {
    e.preventDefault();
    const { username, password } = this.state;

    axios
      .post(`http://localhost:3001/api/users/login`, { username, password })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.status === 200) {
          //save user to localstorage
          localStorage.setItem("logged_user", JSON.stringify(res.data));
          toast.success("Login Successfull");

          // let path = `/`;
          // this.props.history.push(path);
        } else {
          console.log("request error");
        }
      })
      .catch(function (err) {
        toast.error(err.response.data.message);
        console.log(err.response.data);
      });
  }
  render() {
    console.log(Form_Sidebar_BackgroundImage);
    return (
      <React.Fragment>
        <ToastContainer />

        <div
          className="row align-items-center login-component-wrapper"
          style={{
            backgroundImage: "url(" + Login_Compoenent_BackgroundImage + ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="col-md-2"></div>
          <div className="col-md-8 ">
            <div className="row ">
              <div
                className="col-md-4 sidebar-wrapper "
                style={{
                  backgroundImage: "url(" + Form_Sidebar_BackgroundImage + ")",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {/* start side bar content  */}
                <small className="font-weight-bold text-white">
                  Not already Registered
                </small>
                <small className="font-weight-bold text-white">
                  Create a free account now{" "}
                </small>
                {/* <div className="text-white">
                <ClockContainer />
              </div> */}
                <button
                  type="button"
                  id="signupBtn"
                  className="btn btn-warning btn-block "
                  onClick={this.routeChange}
                >
                  <i
                    className="fa fa-user-plus fa-2x text-white"
                    aria-hidden="true"
                  ></i>
                </button>
              </div>
              {/* end side bar content  */}

              <div
                className="col-md-8 bg-dark form-wrapper"
                style={{
                  backgroundImage: "url(" + Form_BackgroundImage + ")",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {/* start card form  */}
                <div className="row bg-dark">
                  <div className="col-md-12 ">
                    <ClockContainer />
                  </div>
                </div>
                <h2 className="font-weight-bold text-success">Login Now </h2>
                <div className="d-flex flex-row justify-content-center align-items-center mt-3 mb-3">
                  <span className="ml-2 mr-2 ">
                    <i
                      className=" fa-2x text-primary fa fa-facebook-official"
                      aria-hidden="true"
                    ></i>
                  </span>
                  <span className="ml-2 mr-2 ">
                    <i
                      className=" fa-2x text-success fa fa-google-plus-official"
                      aria-hidden="true"
                    ></i>
                  </span>
                  <span className="ml-2 mr-2 ">
                    <i
                      className=" fa-2x text-info fa fa-twitter-square"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div>
                <form>
                  <div className="form-row form-inline">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="user name"
                      className="form-control custom-login-input"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-row form-inline">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="password"
                      className="form-control custom-login-input"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <small className="text-white font-weight-bold">
                      Click here to login{" "}
                    </small>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      name="submit"
                      className="btn btn-success"
                      onClick={this.submitForm}
                      id="submit"
                    >
                      <i className="fa fa-sign-in fa-2x" aria-hidden="true"></i>
                    </button>
                  </div>
                </form>

                {/* end card form  */}
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </React.Fragment>
    );
  }
}
