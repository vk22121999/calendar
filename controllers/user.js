const UserModel = require("../models/user");

const fetchUser = async(req,res) =>{
    try{

        const user = await UserModel.findOne({_id:req.userData._id},{_id:0,password:0})


        res.status(200).send({ user: user });
    }
    catch(e)
    {
        console.log(e);
        res.status(400).json({ message: "Some error occured :(" });     
    }
}
module.exports = fetchUser