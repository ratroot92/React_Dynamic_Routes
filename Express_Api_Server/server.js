const express = require("express");
const body_parser = require("body-parser");
const cors = require("cors");
const db = require("./config/db");
const app = express();

const port = "3001";
app.use(
  body_parser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());

const user_route = require("./routes/user.routes");
app.use("/api", user_route);

app.listen(port, (err) => {
  if (!err) {
    console.log("SERVER STARTED AT PORT " + port);
  } else {
    console.log(err);
  }
});
