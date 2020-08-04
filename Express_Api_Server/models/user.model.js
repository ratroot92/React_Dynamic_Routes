const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    first_name: {
      type: String,
      require: true,
      unique: false,
    },
    last_name: {
      type: String,
      require: true,
      unique: false,
    },
    username: {
      type: String,
      require: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      require: true,
      unique: false,
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

module.exports = mongoose.model("User", UserSchema);
