import { useEffect, useState } from "react";
import { Page } from "../Pages/page";
import { useTodos} from "../hooks/hook"
import axios from "axios";
import BACKEND_URL from "../config";
import { useNavigate } from "react-router-dom";

export const Dashboard=()=>{
   
    const {todos,loading}=useTodos();
    // const t=useUpdateTodo();
   
   
    if(loading){
        return <div>
            loading........
        </div>
    }
    console.log(todos);
    return <div>
        Todo Dashboard
        {/* {todos.map((todo:any)=>{
            <Page title={todo.title} Description={todo.Description} isCompleted={todo.isCompleted}></Page>
      
        })} */}
        {todos.map((todo:any)=>{
           return <Page key={todo.id} id={todo.id} title={todo.title} Description={todo.description} isCompleted={todo.completed}></Page>
        })}
        <Button></Button>
    </div>
}

function Button(){
    const navigate=useNavigate();
    return <div>
        <button onClick={()=>{
            navigate("/addTodo")
            
        }} type="button" className="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none ">Add Todo </button>
    </div>
}


// function AddTodo(){
//     axios.put(`${BACKEND_URL}/api/v1/todo`,{title,completed:true},{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((res)=>{
          

// }