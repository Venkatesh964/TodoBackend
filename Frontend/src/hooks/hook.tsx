import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from '../config';

export const useTodos=()=>{
    const [todos,setTodos]=useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
       axios.get(`${BACKEND_URL}/api/v1/todo`,{
            headers: {
                Authorization:"Bearer "+ localStorage.getItem("token")  
            }
        }).then((res)=>{
            setTodos(res.data.todos);
            setLoading(false);
            // return res.data.todos;
        })
    },[]);
    return {
        todos,
        loading
    }
}

// export const useUpdateTodo=()=>{
//     const [updated,setUpdated]=useState(false);
//     useEffect(()=>{
//         try{
//         axios.put(`${BACKEND_URL}/api/v1/todo`,{completed:true},{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((res)=>{
//             setUpdated(true);
//         })}catch(e){
//             setUpdated(false);
//         }
//     });
//     return {updated};
// }

