const {JWT_SECRET}=require("../config");
const jwt=require("jsonwebtoken");

const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader||!authHeader.startsWith('Bearer ')){
        res.status(200).json({
            message:"no/wrong auth header"
        })
    }

    const token=authHeader.split(' ')[1]
console.log(token)
        const decoded=jwt.verify(token,JWT_SECRET);
        console.log(token)
        if(decoded){
        req.userId=decoded.userId;
        next();
        }
        else{
        res.status(200).json({
        allowed:false
        });
        }
}

module.exports={
    authMiddleware
}