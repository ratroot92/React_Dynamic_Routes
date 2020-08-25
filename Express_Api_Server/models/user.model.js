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
    hashed_password: {
      type: String,
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
// virtual
UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// methods
UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

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

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};
module.exports = mongoose.model("User", UserSchema);
