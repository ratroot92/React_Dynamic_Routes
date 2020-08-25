import React from "react";
import "./Style.css";

function Card(props) {
  function Add_To_Cart(e) {
    console.log(e);
  }
  return (
    <div className="row">
      {props.Data.map((data) => (
        <div className="col-md-4 mt-2" key={data.key}>
          <div className="card">
            <div className="card-img">
              <img src={data.CardImg} alt="" className="img-fluid" />
            </div>
            <div className="card-header text-center">
              <div className="card-title">{data.CardTitle}</div>
            </div>
            <div className="card-body">
              <div className="card-text">{data.CardText}</div>
            </div>
            <div className="card-header text-center">
              <button
                className="btn btn-primary"
                data-id={data.id}
                id={data.id}
                onClick={() => Add_To_Cart(data.CardTitle)}
              >
                <i className="fas fa-shopping-cart  mr-2"></i>Add to cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Card;
