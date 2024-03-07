import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BACKEND_URL from "../config";


export default function Signup(){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    async function setInputs(){
        try{
        const response=await axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
           username,
           password
        });
        if(!response.data.token){
            localStorage.setItem("token",response.data.token);
            navigate("/dashboard");
        }
        else{
            console.log("signup failed");
        }
        }catch(e){
            console.log("failed in post request");
        }
    }
    return <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
                <div>
                    <div className=" px-20 text-xl font-semibold py-4">
                        Sign Up
                    </div>
                    <div className="flex py-2 text-sm">
                        <div>  Already have an account ? </div>
                        <Link to={'/signin'}>
                            <div className="pl-2 underline">Sign In</div>
                        </Link>
                    </div>
                    <div>
                        <label  className="px-2 block mb-2 text-sm font-medium text-gray-900">Email address</label>
                    </div>
                    <div className="mb-6 w-1/2 w-64 justify-center ">
                        <input type="text" onChange={(e:any)=>{
                    setUsername(e.target.value);
                }}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="abcd@example.com" required />
                    </div> 
                   
                    <div>
                    <label  className="px-2 block mb-2 text-sm font-medium text-gray-900">Password</label>
                    </div>
                    <div className="mb-6 w-1/2 w-64 justify-center ">
                        <input type="password" onChange={(e:any)=>{
                    setPassword(e.target.value);
                }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="12345678" required />
                    </div> 
                    <button type="button" onClick={setInputs} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Signup</button>
                    </div>
                </div>
            </div>
}

