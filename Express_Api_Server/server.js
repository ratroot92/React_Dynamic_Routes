const express = require("express");
const morgan = require("morgan");
const body_parser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config({
  path: "./config/config.env",
});
const app = express();
//Connect to database
connectDB();
const port = "3001";
app.use(
  body_parser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());

/* user routes */
const user_route = require("./routes/user.routes");
app.use("/api/users", user_route);
/* auth routes */
// const auth_route = require("./routes/auth.routes");
// app.use("/api", auth_route);

//Page not found
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Page not found ",
  });
});

//Config for only development server
// if (process.env.NODE_ENV === "development") {
//   app.use(
//     cors({
//       origin: process.env.CLIENT_URL,
//     })
//   );
//   //Morgan gives information about each request
//   app.use(morgan("dev"));
// }
const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (!err) {
    console.log("SERVER STARTED AT PORT " + PORT);
  } else {
    console.log(err);
  }
});
