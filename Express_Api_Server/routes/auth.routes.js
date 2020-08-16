const express = require("express");
const router = express.Router();
const expressJwt = require("express-jwt");
const { OAuth2Client } = require("google-auth-library");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
//Custom error hanlder to get useful errors
const { errorHandler } = require("./../helpers/dbErrorHandling");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.MAIL_KEY);
const UserModel = require("../models/user.model");

//middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

/* http://localhost:3001/api/auth/login    */
/* Login Authtentication      */
router.post("/auth/login", (req, res) => {
  console.log("Login");
  const { username, password } = req.body;
  const errors = validationResult(req);
  //check errors of express validators

  //validation to req.body we will crearte custom errors in seconds
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      error: firstError,
    });
  } else {
    UserModel.findOne({
      username: username,
      password: password,
    })
      .then((user) => {
        if (user) {
          console.log({ msg: "Valid User" });
          return res.status(200).json({ message: "Valid User" });
          //Generate Token
          const token = jwt.sign(
            {
              username,
              password,
            },
            process.env.JWT_ACCOUNT_ACTIVATION,
            {
              expiresIn: "15m",
            }
          );

          const emailData = {
            from: process.env.EMAIL_FROM,
            to: to,
            subject: "Account Activation Link",
            html: `<div>
            <h1>Please Click on the link to activate </h1>
            <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
            <p>This email contains sensitive info </p>
            <p>${process.env.CLIENT_URL}</p>
            </div>`,
          };
          sgMail.send(emailData).then((sent) => {
            return res
              .json({
                message: `Email has been sent to ${email}`,
              })
              .catch((err) => {
                return res.status(400).json({
                  error: errorHandler(err),
                });
              });
          });
        }
        console.log({ msg: "Invalid User" });
        return res.status(400).json({ message: "In-Valid User" });
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json("Error: " + err);
      });
  }
});

module.exports = router;
