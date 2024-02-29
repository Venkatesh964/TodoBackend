import jwt from "jsonwebtoken";
import JWT_SECRET from "./config";

function authMiddleware(req:any,res:any,next:any){
    try{
    const header=req.headers["authorization"];
    //console.log(header);
    const token=header.split(" ")[1];
    if(!token){
        req.json({
            msg:"token is invalid"
        })
    }
  
    const decode:any=jwt.verify(token,JWT_SECRET);

    req.body.id=decode.id;
    
    next();
    
    }
    catch(err){
        return res.json({
            err
        })
    }
}

export default authMiddleware;