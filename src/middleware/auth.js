const jwt = require('jsonwebtoken');

const Registration = require('../models/registration');

const auth = async (req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        
        const user =await Registration.findOne({_id:verifyUser._id});
   
        // console.log(user);
        req.token = token;
        req.user = user;
        
        next();
    }catch(err){
        res.status(401).send(err);
    }
}

module.exports = auth;