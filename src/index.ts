import express, { Router } from "express";

// const router=express.Router;
import cors from 'cors';
import router from "./routes";

const app=express();

app.use(cors());
app.use(express.json());
app.use("/api/v1",router);

// app.get("/",(req,res)=>{
//     console.log("hi there");
//     return;
// })

app.listen(3000,()=>{
    console.log("listening on port 3000");
})
