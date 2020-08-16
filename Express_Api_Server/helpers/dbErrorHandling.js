"use Strict";

/*

Get Unique error field

*/

const uniqueMessage = (error) => {
  let output;
  try {
    let fieldName = error.message.split(".$")[1];
    field = field.split("dub key ")[0];
    field = field.substring(0, field.lastIndexOf("_"));
    requestAnimationFrame.flash("erros", [
      {
        message: "An account with this " + field + " already exists",
      },
    ]);
    output =
      fieldName.charAt(0).toUpperCase() +
      fieldName.slice(1) +
      " already exists";
  } catch (err) {
    output = "already exists";
  }
  return output;
};

/*
get the error message from error object
 */
exports.errorHandler = (error) => {
  let message = "";
  if (error.code) {
    switch (error.code) {
      case 11000:
      case 11001:
        message = uniqueMessage(error);

      default:
        message = "Something went wrong";
    }
  } else {
    for (let errorName in error.errorors) {
      if (error.errorors[errorName].message) {
      }
    }
  }
  return message;
};
