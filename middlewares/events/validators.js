const { body} =  require('express-validator');


const addEventValidator = [
//  body("eventid").not().withMessage("Event id is required"),
//   body("description").not().withMessage("Event description  is required"),
//   body("startDate").not().isDate().withMessage("Valid Start Date is required"),
//   body("EndDate").not().isDate().withMessage("Valid end date is required"),
//   body("Identificationdate").not().withMessage("date is required"),

]
const UpdateEventValidator = [

    // body("Identificationdate").not().withMessage("Identification date is required")
  
  ]
  const DeleteEventValidator = [
 
    // body("Identificationdate").not().withMessage("Identification date is required")
  
  ]



module.exports = {
 addEventValidator,UpdateEventValidator,DeleteEventValidator
};