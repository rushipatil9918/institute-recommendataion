const router = require("express").Router();
const auth = require("../middlewares/auth");
const { check, validationResult } = require("express-validator");

const {
  studentRegister,
  studentLogin,
} = require("../controllers/student.controller");

router.post(
  "/register",
  [
    check("studentName", "Name length should be 1 to 50 characters")
      .trim()
      .isLength({ min: 1, max: 50 }),

    check("studentEmail", "Email length should be 3 to 50 characters")
      .trim()
      .isEmail()
      .isLength({ max: 50 }),
    check("password", "Password length should be 6 to 20 characters")
      .trim()
      .isLength({ min: 6, max: 20 }),
  ],
  studentRegister
);

router.post(
  "/login",
  [
    check("studentEmail", "Email length should be 3 to 30 characters")
      .trim()
      .isEmail()
      .isLength({ max: 30 }),
    check("password", "Password length should be 6 to 20 characters")
      .trim()
      .isLength({ min: 6, max: 20 }),
  ],
  studentLogin
);


module.exports = router;