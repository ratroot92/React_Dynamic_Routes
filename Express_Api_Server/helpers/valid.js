//Validations Helpers 
const {check} =require('express-validator')
exports.validRegister=[
    check('name','Name is required').isEmpty().isLength({
        min:4,
        max:32,
    })
    .withMessage('name must be betweeen 3 and 32 chrachters '),
     check('email').isEmpty().withMessage('Must be valid email address '),
     check('password').isLength({
        min:8,
           max:14
    })
    .withMessage('Password must contain at least 8 letters ')
    .matches('/\d/')
    .withMessage('Password must contain a number'),
    
]


//Login
exports.validLogin=[
   check('email')
   .isEmail()
   .withMessage('Must be valid email address'),
   check('password').isLength({
        min:8,
        max:14
   })
   .withMessage('Password must contain at least 8 letters ')
   .matches('/\d/').withMessage('Password must contain a number'),
    
]

//Forget Passwrod
exports.forgotPasswordValidator=[
    check('email')
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('Must be valid email address')
]

//Reset Password
exports.resetPasswordValidator=[
    check('newPassword')
    .not()
    .isEmpty()
    .isLength({
        min:8,
        max:14
    })
    .withMessage('Password must contain at least 8 letters ')
]