const UserModel = require("../models/user");

const fetchEvents = async(req,res) =>{
    try{

        const user = await UserModel.find({_id:req.userData._id})
 
      

        res.status(200).send({ events: user[0].events });
    }
    catch(e)
    {
        console.log(e);
        res.status(400).json({ message: "Some error occured :(" });     
    }
}
const addEvent = async (req, res) => {

    const newEvent = req.body;
  
  try {
    let user = await UserModel.findByIdAndUpdate( req.userData._id,{
      $push: {
        events: {
           $each: [ {...newEvent,startDate:new Date(newEvent.startDate),endDate:new Date(newEvent.endDate)}],
           $sort: { startDate: -1 },

        }
      }
    });
    let userNew = await UserModel.findById(req.userData._id);

    res.status(200).json({ message: "Event Added" ,events:userNew.events});
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Some error occured :(" });
  }
}
const updateEvent = async (req, res) => {

    const UpdateEvent = req.body;
  try {
    let user = await UserModel.updateOne({_id:req.UserData._id,"events.eventid":req.params.eventid},{
        $set:{
            "events.$":UpdateEvent
        }
    });

    res.status(200).json({ message: "Event Added" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Some error occured :(" });
  }
}
const deleteEvent = async (req, res) => {
    try {
      let user = await UserModel.updateOne({_id:req.UserData._id},{
          $pull:{
              "events":{
                  "eventid":req.params.eventid
              }
          }
      });
      res.status(200).json({ message: "Event deleted" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Some error occured :(" });
    }
  };
module.exports = {
    fetchEvents,addEvent,updateEvent,deleteEvent
  };