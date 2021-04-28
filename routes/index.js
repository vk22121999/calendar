const express = require("express");
const { verifyUser } = require("../middlewares/verify/verifyUser");
const router = express.Router();
const AuthRoutes = require("./auth");
const EventRoutes = require("./event")


router.use("/auth",verifyUser ,AuthRoutes);
router.use("/events",verifyUser,EventRoutes);


module.exports = router;