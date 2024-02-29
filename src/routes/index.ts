import express, { Router } from "express";

const route:Router=express.Router();

import todoRouter from "../Todo/TodoRouter";
import userRouter from "../Todo/user"

route.use("/todo",todoRouter);
route.use("/user",userRouter);

export default route;