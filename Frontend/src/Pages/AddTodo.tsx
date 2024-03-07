import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BACKEND_URL from "../config";

export const AddTodo=()=>{
    const navigate=useNavigate();
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    return <div>
       <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
            <input type="text" onChange={(e)=>{
                setTitle(e.target.value)
            }} className="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John" required />
        </div>
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
            <input type="text" onChange={(e)=>{
                setDescription(e.target.value)
            }}  className="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John" required />
        </div>

        <div>
        <button onClick={()=>{
            try{
            axios.post(`${BACKEND_URL}/api/v1/todo/`,{title,description},{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((res)=>{
                console.log(res.data.todos);
            })
            navigate("/dashboard")}catch(e){
                console.log(e);
            }
        }} type="button" className="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none ">Add Todo </button>
    </div>
        
    </div>
}