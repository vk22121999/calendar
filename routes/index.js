const express = require("express");
const { verifyUser } = require("../middlewares/verify/verifyUser");
const router = express.Router();
const AuthRoutes = require("./auth");
const EventRoutes = require("./event");
const UserRoutes = require("./users")


router.use("/auth",AuthRoutes);
router.use("/events",verifyUser,EventRoutes);
router.use("/user",verifyUser,UserRoutes);

module.exports = router;