const College = require("../models/collegeModel.js");
const mongoose = require("mongoose");

const findColleges = async (req, res) => {
    const marks = req.body.marks;
  try {
    
    const result = await College.find({
        "dept.percentile": {
          $gte: marks-3,
          $lt: marks+3
        }
      }); 

    const colleges = result.map(college => college.college);
  
    return res.status(200).json(colleges);
  } catch (error) {
    console.error(`Error in finding colleges : ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  findColleges
};