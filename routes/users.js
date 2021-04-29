const express = require("express");
const router = express.Router();
const ValidateReq = require("../middlewares/auth/validate_req");
const fetchUser = require("../controllers/user");

router.get("/",fetchUser);

module.exports = router;