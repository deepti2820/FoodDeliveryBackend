const jwt = require('jsonwebtoken');

module.exports.authMiddleware=async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        res.json({success:false,messgae:"Not Authorized"})
    }
    try{
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=token_decode.id;
        next();
    }catch(e){
        console.log(e);
        res.json({success:false,messgae:"Error"})
    }
}