const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model");
//middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.post("/users/add", (req, res, next) => {
  console.log(req.body);
  var myData = new UserModel(req.body);
  myData
    .save()
    .then((item) => {
      res.send({ status: "200", item });
      console.log("success");
    })
    .catch((err) => {
      res.status(400).send(err);
      console.log("failed");
      console.log(err);
    });
});

router.get("/users/verify/email", (req, res, next) => {
  var Email_List = [];
  UserModel.find({}, function (err, users) {
    for (var i = 0; i < users.length; i++) {
      Email_List[i] = users[i].email;
    }
    console.log(Email_List);
    if (Email_List.constructor === Array) console.log("its an array");
    console.log(typeof Email_List);
    res.send({ Email_List: Email_List });
  });
});

module.exports = router;
