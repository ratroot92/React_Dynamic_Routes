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

const {
  activationController,
  registerController,
  loginController
}=require('./../controllers/auth.controller.js')
//validator functions
const {validRegister,loginValidator,resetPasswordValidator,forgotPasswordValidator,validLogin}=require('./../helpers/valid')

// router.post('/register',validRegister,activationController)
router.post('/register',registerController)
router.post('/activate', activationController)
router.post('/login', loginController)


//middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

// router.post("/users/add", (req, res, next) => {
//   console.log(req.body);
//   var myData = new UserModel(req.body);
//   myData
//     .save()
//     .then((item) => {
//       res.send({ status: "200", item });
//       console.log("success");

//     })
//     .catch((err) => {
//       res.status(400).send(err);
//       console.log("failed");
//       console.log(err);
//     });
// });



/* http://localhost:3001/api/users/verify/email    */
/* Verifies if email is unique or not in signup form     */
router.post("/verify/email", (req, res) => {
  console.log("Verifies if email is unique or not in signup for");
  console.log("Request: ", req.body);
  UserModel.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        console.log({ msg: "Email already been taken" });
        return res.json({ msg: "Email already been taken" });
      }

      console.log({ msg: "Email available." });
      return res.json({ msg: "Email available." });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json("Error: " + err);
    });
});

/* http://localhost:3001/api/users/verify/username    */
/* Verifies if username is unique or not in signup form     */
router.post("/verify/username", (req, res) => {
  console.log("Verifies if username is unique or not in signup for");
  console.log("Request: ", req.body);
  UserModel.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        console.log({ msg: "Username already been taken" });
        return res.json({ msg: "Username already been taken" });
      }

      console.log({ msg: "Username available." });
      return res.json({ msg: "Username available." });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json("Error: " + err);
    });
});

module.exports = router;
