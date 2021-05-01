const express = require("express");
const router = express.Router();
const Validators = require("../middlewares/events/validators");
const ValidateReq = require("../middlewares/events/validate_req");
const EventController = require("../controllers/events");

router.get("/",EventController.fetchEvents)
router.post("/add",EventController.addEvent);
router.put("/update/:eventid", EventController.updateEvent);
router.delete("/delete/:eventid",EventController.deleteEvent);

module.exports = router;