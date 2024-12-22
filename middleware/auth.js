const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req,res,next) => {
    console.log(req.header('Authorization'),'gelen token')
    const token = req.header('Authorization')?.split(' ')[1];

    if(!token){
        return res.status(401).json({response:{success: false, httpStatus:'401_Unauthorized', responseMessage:'No token provided'}})
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded;
        next();
    }catch(e){
        return res.status(401).json({response:{success: false, httpStatus:'401_Unauthorized', responseMessage:'Invalid token'}})
    }
    
}

module.exports = authMiddleware