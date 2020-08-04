import React from "react";
import { withRouter } from "react-router-dom";
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
    console.log(this.state);
    if (username === "ahmed" && password === "ahmed") {
      console.log("successfull");
      console.log(this.props);
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
    } else {
      console.log("failed");
    }
    //loginmagic
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header"></div>
            <div className="card-body">
              <form>
                <div className="form-row">
                  <label>UserName </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-row">
                  <label>Password </label>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-row">
                  <input
                    type="submit"
                    name="submit"
                    onClick={this.submitForm}
                    id="submit"
                  />
                </div>
              </form>
            </div>
            <div className="card-footer">
              <span>Have no account .... </span>
              <button className="btn btn-warning" onClick={this.routeChange}>
                Sign Up First{" "}
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}
