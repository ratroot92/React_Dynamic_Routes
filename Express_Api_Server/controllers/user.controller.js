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



exports.module=registerController()