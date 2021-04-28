const express = require("express");
const router = express.Router();
const Validators = require("../middlewares/events/validators");
const ValidateReq = require("../middlewares/events/validate_req");
const EventController = require("../controllers/events");

router.get("/",EventController.fetchEvents)
router.post("/add",Validators.addEventValidator,ValidateReq,EventController.addEvent);
router.post("/update/:eventid", Validators.UpdateEventValidator,ValidateReq, EventController.updateEvent);
router.post("/delete/:eventid", Validators.DeleteEventValidator,ValidateReq, EventController.deleteEvent);

module.exports = router;