import React, { Component } from "react";
import Card from "../components/Card";
import auth from "../components/Protected/Auth";
const CardData = [
  {
    CardImg: "",
    key: 1,
    CardTitle: "Fresh Oranges",
    CardText:
      "The orange is the fruit of various citrus species in the family Rutaceae; it primarily refers to Citrus × sinensis, which is also called sweet orange, to distinguish it from the related Citrus × aurantium, referred to as bitter orange",
  },
  {
    CardImg: "",
    key: 2,
    CardTitle: "Fresh Oranges",
    CardText:
      "The orange is the fruit of various citrus species in the family Rutaceae; it primarily refers to Citrus × sinensis, which is also called sweet orange, to distinguish it from the related Citrus × aurantium, referred to as bitter orange",
  },
  {
    CardImg: "",
    key: 3,
    CardTitle: "Fresh Oranges",
    CardText:
      "The orange is the fruit of various citrus species in the family Rutaceae; it primarily refers to Citrus × sinensis, which is also called sweet orange, to distinguish it from the related Citrus × aurantium, referred to as bitter orange",
  },
  {
    CardImg: "",
    key: 4,
    CardTitle: "Fresh Oranges",
    CardText:
      "The orange is the fruit of various citrus species in the family Rutaceae; it primarily refers to Citrus × sinensis, which is also called sweet orange, to distinguish it from the related Citrus × aurantium, referred to as bitter orange",
  },
];
class Home extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="container">
        <Card Data={CardData} />
      </div>
    );
  }
}

export default Home;
