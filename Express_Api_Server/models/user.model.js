const mongoose = require("mongoose");
const crypto = require("crypto");

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    first_name: {
      type: String,
      require: true,
      trim: true,
      unique: false,
      required: true,
    },
    last_name: {
      type: String,
      require: true,
      unique: false,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      require: true,
      unique: true,
      index: true,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      index: true,
      trim: true,
      // lowerCase=true,
      required: true,
    },
    password: {
      type: String,
      require: true,
      unique: false,
      required: true,
    },
    salt: String,
    role: {
      type: String,
      default: "Normal",
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
    is_Active: {
      type: Boolean,
      unique: false,
      default: false,
    },
    is_Admin: {
      type: Boolean,
      unique: false,
      default: false,
    },
  },
  { timestamps: true }
);

//Virtual Password
UserSchema.virtual("vPassword")
  .set(function (vPassword) {
    //set vPassword note you must normal function * not arrow function
    this.vPassword = vPassword;
    this.salt = this.makeSalt();
    this.password = this.encryptPassword(vPassword);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  //generate salt
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
  //encrypt password
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  //Compare password between plain get from user and hashed
  authenticate: function (plainPassword) {
    return this.encryptPassword(plainPassword) === this.password;
  },
};
module.exports = mongoose.model("User", UserSchema);
