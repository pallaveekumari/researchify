const jwt = require("jsonwebtoken");
const { UserModel } = require("../Models/User.model");
require("dotenv").config();
const bcrypt = require("bcrypt");

const Signup = async (req, res) => {
  try {
    let { name, email, password } =  await req.body;
    let existingUser = await UserModel.find({ email });
    if (existingUser.length > 0) {
      res.status(400).json({ msg: "USER ALREADY REGISTERED", status: false });
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          if (err) {
            res.status(400).json({
              msg: "SOMETHING WENT WRONG PLEASE TRY AGAIN",
              status: false,
            });
          } else {
            let new_user = await new UserModel({ name, email, password: hash });
            await new_user.save();
            res.status(200).json({ msg: "SIGNUP SUCCESS", status: true });
          }
        });
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ msg: "USER SIGNUP FAILED", error: err, status: false });
  }
};


const Login = async (req, res) => {
  try {
    const {email, password } = req.body;
    const registeredUser = await UserModel.findOne({ email });

    if (registeredUser) {
      bcrypt.compare(password, registeredUser.password, function (err, result) {
        if (err) {
          return res.status(400).json({
            msg: "SOMETHING WENT WRONG PLEASE TRY AGAIN",
            status: false,
          });
        }
        if (result) {
          const token = jwt.sign(
            { userId: registeredUser._id },
            process.env.SECRET
          );

          return res.status(200).json({
            msg: "Login successful",
            status: true,
            token,
            user: { name: registeredUser.name, email: email },
          });
        } else {
          return res.status(400).json({
            msg: "INCORRECT CREDENTIALS",
            status: false,
          });
        }
      });
    } else {
      return res.status(400).json({
        msg: "USER NOT REGISTERED",
        status: false,
      });
    }
  } catch (err) {
    return res.status(400).json({
      msg: "USER LOGIN FAILED",
      error: err,
      status: false,
    });
  }
};

module.exports = {
  Signup,
  Login
};