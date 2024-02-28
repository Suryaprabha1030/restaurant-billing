import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Menu = () => {
    const url=`${import.meta.env.VITE_API_BASE_URL}/api`
    const[menu,setmenu]=useState([])
    const[selectdata,setselectdata]=useState([])
    const nameRef=useRef()
    const varRef=useRef()
    const catRef=useRef()
    const priceRef=useRef()
    const qtyRef=useRef()
    useEffect(()=>{
        getData()
    },[])

    const add=async(e)=>{

        e.preventDefault()
        try{
        const data={
           name: nameRef.current.value,
           variety:varRef.current.value,
           catagory: catRef.current.value,
           price:priceRef.current.value,
           quantity:qtyRef.current.value}
        const res=await axios.post(url+"/bill",data)
        getData()
         nameRef.current.value=""
        varRef.current.value=""
        catRef.current.value=""
       priceRef.current.value=""
        qtyRef.current.value=""
        toast.success("data added succesfully",{
            position: "top-center",
            autoClose:8000 })
     }

     catch(err){
        toast.error("data failed to added")
     }
    }

    const getData=async(e)=>{
        const res=await axios.get(url+"/bill")
        setmenu(res.data)

    }

    const rowdata=(u)=>{
       setselectdata(u)
    }

    const editdata=()=>{
        nameRef.current.value=""
        varRef.current.value=""
        catRef.current.value=""
       priceRef.current.value=""
        qtyRef.current.value=""
        nameRef.current.value=selectdata.name
        varRef.current.value=selectdata.variety
        catRef.current.value=selectdata.catagory
        priceRef.current.value=selectdata.price
        qtyRef.current.value=selectdata.quantity
    }

    const update=async(e)=>{
        try{
        const id=selectdata.id
        e.preventDefault()
        const data={
            name: nameRef.current.value,
            variety:varRef.current.value,
            catagory: catRef.current.value,
            price:priceRef.current.value,
            quantity:qtyRef.current.value}
        const res=await axios.put(url+"/bill/"+id,data)
        console.log(res)
        getData()
        nameRef.current.value=""
        varRef.current.value=""
        catRef.current.value=""
         priceRef.current.value=""
        qtyRef.current.value=""
        toast.success("data updated succesfully",{
            position: "top-center",
            autoClose:8000 })
     }


    catch(err){
        toast.error("data failed to update")
    }
}
    const deletedata=async(e)=>{
        try{
        const id=selectdata.id
        e.preventDefault()
        const res=await axios.delete(url+"/bill/"+id)
        getData()
        toast.success("data deleted successfully",{
            position: "top-center",
            autoClose:8000
        })}
        catch(err){
            toast.error("data failed to delete")
        }


    }
  return (

    <div className='w-screen h-screen flex flex-row border-8 border-blue-800'>

    <div className='w-1/3 h-full relative bg-blue-200 flex flex-col items-center gap-6'>


      <h1 className='text-3xl font-bold text-center mt-10'>Dark hotel</h1>
      <a href='/bill'><button className='w-20 h-10  absolute top-2 left-4  '><img src='/src/assets/exit.png' className='w-10 h-10' /></button></a>

      <input  className='w-3/4 h-15 p-3 border-2 border-slate-300 text-lg outline-none rounded-md ' type="text" placeholder='Name' ref={nameRef}/>
      <input  className='w-3/4 h-15 p-3 border-2 border-slate-300 text-lg outline-none rounded-md' type="text" placeholder='Variety' ref={varRef}/>
      <input  className='w-3/4 h-15 p-3 border-2 border-slate-300  text-lg outline-none rounded-md' type="text" placeholder='Catagory' ref={catRef}/>
      <input  className='w-3/4 h-15 p-3 border-2 border-slate-300 text-lg outline-none rounded-md' type="text" defaultValue={1}  placeholder='Quantity' ref={qtyRef}/>
      <input  className='w-3/4 h-15 p-3 border-2 border-slate-300 text-lg outline-none rounded-md' type="text" placeholder='Price' ref={priceRef}/>
       <div className='space-x-5 mt-5'>
        <button className='w-20 h-10 bg-blue-800 text-white text-lg font-bold rounded-lg' onClick={add}>Add</button>
        <button className='w-20 h-10 bg-blue-800 text-white text-lg font-bold rounded-lg ' onClick={editdata}>Edit</button>
        <button className='w-20 h-10 bg-blue-800 text-white text-lg font-bold rounded-lg ' onClick={update}>Update</button>
        <button className='w-20 h-10 bg-blue-800 text-white text-lg font-bold rounded-lg ' onClick={deletedata}>Delete</button>

       </div>
    </div>


    <div className='w-2/3 h-full bg-white overflow-y-scroll'>
    <table className='w-full  table-fixed border-collapse border-slate-800 text-center '>
        <thead>
        <tr className='border-2 border-slate-400 h-20 text-center '>
            <th className=' w-16 text-xl border-2 border-s-2 border-slate-800'>S.no</th>
            <th className='p-5 text-xl border-2 border-slate-800'>Name</th>
            <th className='p-5 text-xl border-2  border-slate-800'>Variety</th>
            <th className='p-5 text-xl border-2  border-slate-800'>Catagory</th>

            <th className='p-5 text-xl border-2  border-slate-800'>Price</th>

        </tr>
        </thead>
        <tbody>
        {menu.map(u=>(
        <tr key={u.id} className={selectdata==u ? "bg-blue-200":""} onClick={()=>rowdata(u)}>
            <td className='text-md border-2  border-slate-500 text-center'>{u.id}</td>
            <td className='p-4 text-md border-2  border-slate-500'>{u.name}</td>
            <td className='p-4 text-md border-2  border-slate-500'>{u.variety}</td>
            <td className='p-4 text-md border-2  border-slate-500'>{u.catagory}</td>
            {/* <td className='w-10 text-md border-2  border-slate-500'>{u.quantity}</td> */}
            <td className='p-4 text-md border-2  border-slate-500'>Rs.{u.price}</td>

        </tr>))}
        </tbody>

    </table>


    </div>

     <ToastContainer/>
    </div>
  )
}

export default Menu
