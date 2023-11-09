const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors');
const app = express();
const connectDB = require("./config/db.js");
connectDB();

app.use(cors({
    credentials: true,
    origin: ['http://127.0.0.1:5501']
  }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const studentRoutes = require("./routes/studentRoutes.js")
const findCollegeRoutes = require("./routes/findCollegeRoutes.js")



app.use("/api/student", studentRoutes);
app.use("/api/find", findCollegeRoutes);

app.get("/", (remkq, res)=>{
    res.send("Heyyyyyy")
})

const PORT = process.env.PORT || 5500;
app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})