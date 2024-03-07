import { useEffect, useState } from "react";
import BACKEND_URL from "../config";
import axios from "axios";

interface Todo{
    title:string;
    Description:string;
    isCompleted:boolean;
   id:Number;
}

export const Page=({title,Description,isCompleted,id}:Todo)=>{
   const [completed,setIsCompleted]=useState(isCompleted);
    console.log(isCompleted)
    return <div className="border w-96 ">
        <div className="font-semibold text-lg ">
            <div>{title}</div>
        </div>
      
        <div>{Description}</div>
        <button type="button" onClick={()=>{
           try{
            axios.put(`${BACKEND_URL}/api/v1/todo`,{title,completed:true},{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((res)=>{
                setIsCompleted(true);
            })}catch(e){
                setIsCompleted(false);
            }
        }} className=" ml-2 text-white bg-blue-700 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-xs px-5 py-2.5 me-2 mb-2 ">{completed===true?"Done":"Mark as Done"}</button>
        
        {/* <div>{isCompleted===true?"Done":"Mark as Done"}</div> */}
    </div>
}


const useUpdateTodo=(title:any)=>{
    const [updated,setUpdated]=useState(false);
    useEffect(()=>{
        try{
        axios.put(`${BACKEND_URL}/api/v1/todo`,{title,completed:true},{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((res)=>{
            setUpdated(true);
        })}catch(e){
            setUpdated(false);
        }
    });
    return {updated};
}
