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



// Regiter user 

exports.registerController = (req, res) => {
  console.log("register controller")
  const { first_name,last_name,username,password,email } = req.body;
  //Generate Token
  const token = jwt.sign(
    {
      first_name,
      last_name,
      username,
      email,
      password,

    },
    process.env.JWT_ACCOUNT_ACTIVATION,
    {
      expiresIn: "15m",
    }
  );

  const emailData = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: "Account Activation Link",
    html: `<div>
      <h1>Please Click on the link to activate </h1>
      <p>${process.env.CLIENT_URL}/api/users/activate/${token}</p>
      <p>This email contains sensitive info </p>
      <p>${process.env.CLIENT_URL}</p>
      </div>`,
  };
  sgMail
    .send(emailData)
    .then((sent) => {
      return res.json({
        message: `Email has been sent to ${process.env.EMAIL_TO}`,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
}


exports.activationController=(req,res)=>{
    console.log("activation controller")
const {token}=req.body;
if(token){
//Verify the token is valid or invalid (expired)
  jwt.verify(token,process.env.JWT_ACCOUNT_ACTIVATION,(error,decoded)=>{
    if(error){
        return res.status(401).json({
            error:'Expired Token .... Signup again'
        })
    }
    else{
    //if valid ! save to database 

 
        const {first_name,last_name,username,email,password}=jwt.decode(token)
        const newUser=new  UserModel(jwt.decode(token));
        newUser.save()
        .then((user)=>{
                return res.status(200).json({
                    success:true,
                    message:'Signup success',
                    newUser
                })
        })
            
        .catch((err)=>{
      return res.status(401).json({
                    success:false,
                    error:errorHandler(err)
                })
        })
                
            
        
    
}

  });
}

else{
    return res.json({
        message:'failed to register '
    })

}
}



exports.loginController=(req,res)=>{
  console.log("Login_Controller")
  const {username,password}=req.body;
  console.log(req.body)
  //check if user exist 
   UserModel.findOne({
      username: username,
      password: password,
    }).then((user) => {
        if (user) {
          console.log({ msg: "Valid User" });
          return res.status(200).json({status:200,
           message: "Valid User" });
        }
        else{

        
        console.log({ msg: "Invalid User" });
        return res.status(400).json({ status:400,
        message: "In-Valid User" });
        }
      }).catch((err) => {
        console.error(err);
        res.status(400).json("Error: " + err);
      });

    //Authenticate
    // if(!user.authenticate(password)){
    //   return res.status(400).json({
    //     error:"Incorrect username and password"
    //   })
    // }

    //Generate Token 
    // const token=jwt.sign({
    //   _id:user._id
    // }
    // ,process.env.JWT_SECRET,
    // {
    //   expiresIn:"7d"
    // }
    // )
//  const {_id,first_name,last_name,role,username,email} =user
//  return res.json({
//    _id,
//    first_name,
//    last_name,
//    username,
//    email,
//    role
//  })

    // }).catch((err)=>{
    //   return res.status(400).json({
    //     error:"Failed"
    //   })
    // })
    
    

   

}

