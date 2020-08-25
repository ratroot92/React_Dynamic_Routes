import React from "react";
import auth from "./../components/Protected/Auth";
function Navbar(props) {
 const logOut=()=>{
  console.log("Logout button clicked ");
            
  localStorage.clear();
   props.onChange(false)
   props.history.push("/");
 }
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
          <button
            onClick={() => {logOut()}}
            type="submit"
            className="btn btn-primary"
          >
            Logout
          </button>
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
