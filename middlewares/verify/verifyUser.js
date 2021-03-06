const jwt = require("jsonwebtoken");

let verifyUser = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.USER_JWT_KEY);
    req.userData = { _id: decodedToken._id, isVerified: true };

    return next();
  } catch (error) {
 
    console.log(error.message);
    res.status(400).json({
      status: false,
      message: "User Authentication failed",
      error:{}
    });
  }
};






module.exports = {
  verifyUser
};