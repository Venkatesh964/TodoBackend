import { Router } from "express";

const router:Router=Router();
import { PrismaClient } from "@prisma/client";
import zod from "zod";
const prisma = new PrismaClient();
import authMiddleware from "../middleware";

const todoSchema=zod.object({
    title:zod.string(),
    description:zod.string(),
    completed:zod.boolean()
});

const updateSchema=zod.object({
    description:zod.string().optional(),
    completed:zod.boolean().optional(),
   
});

router.post("/",authMiddleware,async (req,res)=>{
    try{
        const {success}=todoSchema.safeParse(req.body);
        if(!success){
            return res.status(403).json({
                msg:"incorrect formats"
            })
        }
        const user=await prisma.todo.create({
            data:{
                title:req.body.title,
                userId:req.body.id,
                description:req.body.description,
                completed:req.body.completed
            }
        });
        
        return res.status(200).json({
            msg:"todo created successfully"
        });

    }catch(err){
        return res.status(403).send(err);
    }
})


router.get("/",authMiddleware,async (req,res)=>{
    try{
        console.log("not working");
        const response=await prisma.todo.findMany();
        return res.status(200).json({
            todos:response
        });
    }
    catch(err){
        return res.status(403).json({
            error:err
        })
    }
})

router.put("/",authMiddleware,async (req,res)=>{
    try{
        const {success}=updateSchema.safeParse(req.body);
        if(!success){
            return res.status(411).json({msg:"invalid inputs"});
        }
        const updateUser = await prisma.todo.update({
            where: {
              title: req.body.title,
            },
            data: {
                description:req.body.description || undefined,
                completed:req.body.completed || undefined
            },
          });
          return res.json({
            msg:updateUser
          });
    }
    catch(err){
        return res.json({
            msg:err
        })
    }
});


export default router;