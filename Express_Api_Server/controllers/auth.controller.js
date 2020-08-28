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
  console.log("register controller");
  const { first_name, last_name, username, password, email } = req.body;
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
};

exports.activationController = (req, res) => {
  console.log("activation controller");
  const { token } = req.body;
  console.log(token)
  if (token) {
    //Verify the token is valid or invalid (expired)
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (error, decoded) => {
      if (error) {
        return res.status(401).json({
          error: "Expired Token .... Signup again",
        });
      } else {
        //if valid ! save to database

        const { first_name, last_name, username, email, password } = jwt.decode(
          token
        );
        const newUser = new UserModel(jwt.decode(token));
        newUser
          .save()
          .then((user) => {
            return res.status(200).json({
              success: true,
              message: "Signup success",
              newUser,
            });
          })

          .catch((err) => {
            return res.status(401).json({
              success: false,
              error: errorHandler(err),
            });
          });
      }
    });
  } else {
    return res.json({
      message: "failed to register ",
    });
  }
};

exports.loginController = (req, res) => {
  console.log("Login_Controller");
  const { username, password } = req.body;
  console.log(req.body);
  //check if user exist
  UserModel.findOne({
    username: username,
  })
    .then((user) => {
      if (user) {
        //check if hashed password and plain passwrod matched
        if (user.authenticate(password)) {
          console.log("User Authenticated ");
          // Generate Token
          const token = jwt.sign(
            {
              _id: user._id,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "7d",
            }
          );

          const { _id, first_name, last_name, role, username, email } = user;
          return res.status(200).json({
            _id,
            first_name,
            last_name,
            username,
            email,
            role,
            token
          });
        } else {
          console.log("User Not Authenticated ");
          return res.status(400).json({
            status: 400,
            message: "Incorrect password",
          });
        }
      } else {
        console.log({ msg: "Incorrect username" });
        return res.status(400).json({ status: 400, message: "In-Valid User" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: err });
    });

  // }).catch((err)=>{
  //   return res.status(400).json({
  //     error:"Failed"
  //   })
  // })
};


//Original logic 


// exports.signinController = (req, res) => {
//   const { email, password } = req.body;
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const firstError = errors.array().map(error => error.msg)[0];
//     return res.status(422).json({
//       errors: firstError
//     });
//   } else {
//     // check if user exist
//     User.findOne({
//       email
//     }).exec((err, user) => {
//       if (err || !user) {
//         return res.status(400).json({
//           errors: 'User with that email does not exist. Please signup'
//         });
//       }
//       // authenticate
//       if (!user.authenticate(password)) {
//         return res.status(400).json({
//           errors: 'Email and password do not match'
//         });
//       }
//       // generate a token and send to client
//       const token = jwt.sign(
//         {
//           _id: user._id
//         },
//         process.env.JWT_SECRET,
//         {
//           expiresIn: '7d'
//         }
//       );
//       const { _id, name, email, role } = user;

//       return res.json({
//         token,
//         user: {
//           _id,
//           name,
//           email,
//           role
//         }
//       });
//     });
//   }
// };


// exports.requireSignin = expressJwt({
//   secret: process.env.JWT_SECRET // req.user._id
// });

// exports.adminMiddleware = (req, res, next) => {
//   User.findById({
//     _id: req.user._id
//   }).exec((err, user) => {
//     if (err || !user) {
//       return res.status(400).json({
//         error: 'User not found'
//       });
//     }

//     if (user.role !== 'admin') {
//       return res.status(400).json({
//         error: 'Admin resource. Access denied.'
//       });
//     }

//     req.profile = user;
//     next();
//   });
// };

// exports.forgotPasswordController = (req, res) => {
//   const { email } = req.body;
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     const firstError = errors.array().map(error => error.msg)[0];
//     return res.status(422).json({
//       errors: firstError
//     });
//   } else {
//     User.findOne(
//       {
//         email
//       },
//       (err, user) => {
//         if (err || !user) {
//           return res.status(400).json({
//             error: 'User with that email does not exist'
//           });
//         }

//         const token = jwt.sign(
//           {
//             _id: user._id
//           },
//           process.env.JWT_RESET_PASSWORD,
//           {
//             expiresIn: '10m'
//           }
//         );

//         const emailData = {
//           from: process.env.EMAIL_FROM,
//           to: email,
//           subject: `Password Reset link`,
//           html: `
//                     <h1>Please use the following link to reset your password</h1>
//                     <p>${process.env.CLIENT_URL}/users/password/reset/${token}</p>
//                     <hr />
//                     <p>This email may contain sensetive information</p>
//                     <p>${process.env.CLIENT_URL}</p>
//                 `
//         };

//         return user.updateOne(
//           {
//             resetPasswordLink: token
//           },
//           (err, success) => {
//             if (err) {
//               console.log('RESET PASSWORD LINK ERROR', err);
//               return res.status(400).json({
//                 error:
//                   'Database connection error on user password forgot request'
//               });
//             } else {
//               sgMail
//                 .send(emailData)
//                 .then(sent => {
//                   // console.log('SIGNUP EMAIL SENT', sent)
//                   return res.json({
//                     message: `Email has been sent to ${email}. Follow the instruction to activate your account`
//                   });
//                 })
//                 .catch(err => {
//                   // console.log('SIGNUP EMAIL SENT ERROR', err)
//                   return res.json({
//                     message: err.message
//                   });
//                 });
//             }
//           }
//         );
//       }
//     );
//   }
// };

// exports.resetPasswordController = (req, res) => {
//   const { resetPasswordLink, newPassword } = req.body;

//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     const firstError = errors.array().map(error => error.msg)[0];
//     return res.status(422).json({
//       errors: firstError
//     });
//   } else {
//     if (resetPasswordLink) {
//       jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(
//         err,
//         decoded
//       ) {
//         if (err) {
//           return res.status(400).json({
//             error: 'Expired link. Try again'
//           });
//         }

//         User.findOne(
//           {
//             resetPasswordLink
//           },
//           (err, user) => {
//             if (err || !user) {
//               return res.status(400).json({
//                 error: 'Something went wrong. Try later'
//               });
//             }

//             const updatedFields = {
//               password: newPassword,
//               resetPasswordLink: ''
//             };

//             user = _.extend(user, updatedFields);

//             user.save((err, result) => {
//               if (err) {
//                 return res.status(400).json({
//                   error: 'Error resetting user password'
//                 });
//               }
//               res.json({
//                 message: `Great! Now you can login with your new password`
//               });
//             });
//           }
//         );
//       });
//     }
//   }
// };

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT);
// // Google Login
// exports.googleController = (req, res) => {
//   const { idToken } = req.body;

//   client
//     .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT })
//     .then(response => {
//       // console.log('GOOGLE LOGIN RESPONSE',response)
//       const { email_verified, name, email } = response.payload;
//       if (email_verified) {
//         User.findOne({ email }).exec((err, user) => {
//           if (user) {
//             const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//               expiresIn: '7d'
//             });
//             const { _id, email, name, role } = user;
//             return res.json({
//               token,
//               user: { _id, email, name, role }
//             });
//           } else {
//             let password = email + process.env.JWT_SECRET;
//             user = new User({ name, email, password });
//             user.save((err, data) => {
//               if (err) {
//                 console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
//                 return res.status(400).json({
//                   error: 'User signup failed with google'
//                 });
//               }
//               const token = jwt.sign(
//                 { _id: data._id },
//                 process.env.JWT_SECRET,
//                 { expiresIn: '7d' }
//               );
//               const { _id, email, name, role } = data;
//               return res.json({
//                 token,
//                 user: { _id, email, name, role }
//               });
//             });
//           }
//         });
//       } else {
//         return res.status(400).json({
//           error: 'Google login failed. Try again'
//         });
//       }
//     });
// };

// exports.facebookController = (req, res) => {
//   console.log('FACEBOOK LOGIN REQ BODY', req.body);
//   const { userID, accessToken } = req.body;

//   const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

//   return (
//     fetch(url, {
//       method: 'GET'
//     })
//       .then(response => response.json())
//       // .then(response => console.log(response))
//       .then(response => {
//         const { email, name } = response;
//         User.findOne({ email }).exec((err, user) => {
//           if (user) {
//             const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//               expiresIn: '7d'
//             });
//             const { _id, email, name, role } = user;
//             return res.json({
//               token,
//               user: { _id, email, name, role }
//             });
//           } else {
//             let password = email + process.env.JWT_SECRET;
//             user = new User({ name, email, password });
//             user.save((err, data) => {
//               if (err) {
//                 console.log('ERROR FACEBOOK LOGIN ON USER SAVE', err);
//                 return res.status(400).json({
//                   error: 'User signup failed with facebook'
//                 });
//               }
//               const token = jwt.sign(
//                 { _id: data._id },
//                 process.env.JWT_SECRET,
//                 { expiresIn: '7d' }
//               );
//               const { _id, email, name, role } = data;
//               return res.json({
//                 token,
//                 user: { _id, email, name, role }
//               });
//             });
//           }
//         });
//       })
//       .catch(error => {
//         res.json({
//           error: 'Facebook login failed. Try later'
//         });
//       })
//   );
// };