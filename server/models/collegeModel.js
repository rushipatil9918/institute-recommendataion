const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
    
    college: {
        type: String,
        required: true
    },
    dept : [{
        dname:{
            type: String,
            required: true
        },
        percentile: {
            type: Number,
            required: true
        }
    }]
});

const College = mongoose.model("College", collegeSchema);

module.exports = College;