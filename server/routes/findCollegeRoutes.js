const router = require("express").Router();
const auth = require("../middlewares/auth");

const {findColleges} = require("../controllers/findCollege.controller");

router.put('/college',auth ,findColleges);


module.exports = router;