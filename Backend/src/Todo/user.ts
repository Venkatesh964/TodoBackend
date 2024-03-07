import { PrismaClient, User } from "@prisma/client";
import { Router } from "express";
import  jwt  from "jsonwebtoken";
const router=Router();
import zod from "zod";
import JWT_SECRET from "../config";
const prisma = new PrismaClient();

const signupSchema=zod.object({
    username:zod.string().email(),
    password:zod.string().min(6)
});

router.post("/signup",async (req,res)=>{
    try{
        console.log("working");
        const {success} =signupSchema.safeParse(req.body);
        if(!success){
            return res.status(411).json({
                msg:"incorrect format"
            })
        }
        const user=await prisma.user.create({
            data:{
                username:req.body.username,
                password:req.body.password
            }
        });
        const token=jwt.sign({
            id:user.id
        },JWT_SECRET);
        return res.status(200).json({
            token
        });
    }
    catch(err){
        return res.status(403).json({
            err
        })
    }
})


router.post("/signin",async (req,res)=>{
    try{
        const user1 = await prisma.user.findFirst({
            where: {
              username: req.body.username,
              password:req.body.password
            },
          })
          if(!user1){
            return res.json({
                msg:"user doesn't exists"
            });
          }
          
          const token=jwt.sign({id:user1.id},JWT_SECRET);
          return res.status(200).json({
            token
          });
    }
    catch(err){
        return res.status(403).json({
            msg:err
        })
    }
})
export default router;