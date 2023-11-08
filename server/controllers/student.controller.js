const Student = require("../models/studentModel.js");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const studentRegister = async (req, res) => {

  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    console.log(validationErrors);
    res.status(403).json({ message: validationErrors.errors[0].msg });
    return;
  }

  try {
    let { studentName, studentEmail, password} = req.body;


    const alreadyPresent = await Student.findOne({studentEmail});

    if (alreadyPresent) {
      return res.status(400).json({
        message: "User already present with the email",
      });
    }

    const student = await Student.create({
      studentName,
      password,
      studentEmail: studentEmail.toLowerCase(),
    });

    const token = jwt.sign(
      { id: student._id},
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_TOKEN_EXPIRATION,
      }
    );

    const cookieExpiration = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000); // 10 days in milliseconds

    res.cookie("token", token, {
      httpOnly: true,
      expires: cookieExpiration,
      secure: process.env.NODE_ENV === "development" ? false : true,
    });

    res.status(200).json({ message: "Account created", token: token });
  } catch (error) {
    console.error(`Error in Registration : ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

const studentLogin = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    console.log(validationErrors);
    res.status(403).json({ message: validationErrors.errors[0].msg });
    return;
  }
  const { studentEmail, password } = req.body;

  try {
    const student = await Student.findOne({ studentEmail: studentEmail.toLowerCase() });
    if (!student)
      return res.status(404).json({ message: "Account not registered" });

    if (student.password === password) {
      const token = jwt.sign(
        { id: student._id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: process.env.JWT_TOKEN_EXPIRATION,
        }
      );

      const cookieExpiration = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000); // 10 days in milliseconds

      res.cookie("token", token, {
        httpOnly: true,
        expires: cookieExpiration,
        secure: process.env.NODE_ENV === "development" ? false : true,
      });

      return res.status(200).json({ message: "Login successful!" , token: token});
    } else {
      return res.status(400).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.error(`Error in Login : ${error}`);
    return res.status(500).json({ message: "Login failed" });
  }
};

const studentLogout = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(`Error in Logout : ${error}`);
    return res.status(500).json({ message: "Logout failed" });
  }
};

module.exports = {
  studentRegister,
  studentLogin,
  studentLogout,
};