import React, { useRef} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const Login =() => {
    const url=`${import.meta.env.VITE_API_BASE_URL}/api`
    const nameRef=useRef()
    const passRef=useRef()
    const navigate=useNavigate()
    const login=async(e)=>{

        e.preventDefault()
        try{
        const data={
            name:nameRef.current.value,
            password:passRef.current.value
        }
        const res=await axios.post(url+'/login',data)
         navigate("/bill")

       }
       catch(err){
        toast.error("check your input field")

    }}

    return (
    <div className=' w-screen h-screen flex flex-row justify-center items-center border-8 border-blue-800 '>
    <div className='w-1/2'>
        <img src="/src/assets/f2.jpeg" />
     </div>
     <div className='w-1/3 h-1/2  flex flex-col justify-center items-center gap-5 bg-white '>
        <h1 className='font-bold text-2xl mb-10 text-center'>ADMIN LOGIN</h1>
        <input className='w-1/2 border-b-2 text-2xl border-blue-300 outline-none mb-4' ref={nameRef} placeholder='Name'/>
        <input type="password" className='w-1/2 border-b-2 text-2xl border-blue-300 outline-none' ref={passRef} placeholder='Password'/>
        <button className='w-1/4 h-10  text-white mt-5  text-xl font-bold rounded-lg bg-red-500' onClick={login}>Login</button>

     </div>

     <ToastContainer/>


    </div>
  )
}

export default Login
