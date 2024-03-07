import jwt from "jsonwebtoken";
import JWT_SECRET from "./config";

function authMiddleware(req:any,res:any,next:any){
    try{
    const header=req.headers["authorization"];
    const token=header.split(" ")[1];
    if(!token){
        req.json({
            msg:"token is invalid"
        })
    }
    const decode:any=jwt.verify(token,JWT_SECRET);

    req.body.id=decode.id;
    console.log("eorking");
    
    next();
    
    }
    catch(err){
        console.log(err);
        return res.json({
            err
        })
    }
}

export default authMiddleware;