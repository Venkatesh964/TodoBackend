import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BACKEND_URL from "../config";

export default function Signin(){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    async function setInputs(){
        try{
        const response=await axios.post(`${BACKEND_URL}/api/v1/user/signin`,{
           username,
           password
        },{
            headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        });
        localStorage.setItem("token",response.data.token);
        navigate("/dashboard");
        }catch(e){
            console.log("failed in post request");
        }
    }
    return <div className="h-screen flex flex-col justify-center">
    <div className="flex justify-center">
        <div>
            <div className=" px-20 text-xl font-semibold py-4">
                Sign In
            </div>
            <div className="flex py-2 text-sm">
                <div> Don't have an account yet ? </div>
                <Link to={'/signup'}>
                <div className="font-semibold px-2 underline">Sign Up</div>
                </Link>    
            </div>
            <div>
                <label  className="px-2 block mb-2 text-sm font-medium text-gray-900">Email address</label>
            </div>
            <div className="mb-6 w-1/2 w-64 justify-center ">
                <input onChange={(e:any)=>{
                    setUsername(e.target.value);
                }}  type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="abcd@example.com" required />
            </div> 
           
            <div>
            <label  className="px-2 block mb-2 text-sm font-medium text-gray-900">Password</label>
            </div>
            <div className="mb-6 w-1/2 w-64 justify-center ">
                <input onChange={(e:any)=>{
                    setPassword(e.target.value);
                }}  type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="12345678" required />
            </div> 
            <button type="button" onClick={setInputs} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign In</button>
            </div>
        </div>
    </div>
}