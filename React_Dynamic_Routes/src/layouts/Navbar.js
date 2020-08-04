import React from "react";
import { Home } from "../pages/Home";
function Navbar(props) {
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
          <a className="navbar-brand" href="#">
            {props.CompanyName}
          </a>
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            {props.Links.map((link) => (
              <li className="nav-item  " key={link.Id}>
                <a href={link.Path} className="nav-link ">
                  {link.Page_Name}
                </a>
              </li>
            ))}
          </ul>
          <div>
            <button className="btn btn-success btn-sm ">
              <i className="fa fa-shopping-basket mr-2 "></i>0
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
