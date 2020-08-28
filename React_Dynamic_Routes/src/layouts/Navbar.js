import React from "react";
import { withRouter } from "react-router-dom";
// import auth from "./../components/Protected/Auth";
function Navbar(props) {
  
  const logOut = () => {
    console.log("Logout button clicked ");
    localStorage.clear();
    props.history.push("/");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand" href="">
            {props.CompanyName}
          </a>
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            {props.Links.map((link) => (
              <li className="nav-item  " key={link.Id}>
                <a href={link.Path} className={link.Class}>
                  {link.Page_Name}
                </a>
              </li>
            ))}
          </ul>

          <div>
            <button className="btn btn-success btn-sm  mr-2">
              <i className="fa fa-shopping-basket  "></i>0
            </button>
            <button
              onClick={() => {
                logOut();
              }}
              type="submit"
              className="btn btn-warning btn btn-sm text-danger font-weight-bold "
            >
              <i
                className="fa fa-sign-out text-danger fa-2x"
                aria-hidden="true"
              ></i>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navbar);
