import React, { useEffect, useState } from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Bill = () => {
    const url=`${import.meta.env.VITE_API_BASE_URL}/api`
const[data,setData]=useState([])
const [items, setItems] = useState([]);
const [total, setTotal] = useState();
//total caculate changes in items array
useEffect(()=>{
    calculateTotal()


},[items])
//add to bill when click that div
const addToCart = (item) => {
    // window.location.reload()
    if (items.find((iu)=>iu.name== item.name)) {
        toast.error("this item already added")
        console.log("Item already exists in the list.");
        return;
    }
    setItems([...items, item]);

}
// get data using axios
const nonvegmain=async(e)=>{
    e.preventDefault()
    const res=await axios.get(url+"/nonvegmain")
    console.log(res)
    setData(res.data)
}
const vegmain=async(e)=>{
    e.preventDefault()
    const res=await axios.get(url+"/vegmain")
    console.log(res)
    setData(res.data)
}
const vegs=async(e)=>{
    e.preventDefault()
    const res=await axios.get(url+"/vegs")
    console.log(res)
    setData(res.data)
}
const nonvegs=async(e)=>{
    e.preventDefault()
    const res=await axios.get(url+"/nonvegs")
    console.log(res)
    setData(res.data)
}
const all=async(e)=>{

    e.preventDefault()
    const res=await axios.get(url+"/bill")
    console.log(res)
    setData(res.data)
}
// total function
const calculateTotal = () => {
    let total = 0;
    items.forEach(item => {
        total += parseInt(item.price) * parseInt(item.quantity);
    });
    setTotal(total)

}
// qty changes
const handleQtyChange = (index, newQty) => {
    const updatedItems = [...items];
    newQty = Math.abs(newQty);
    updatedItems[index].quantity = newQty;
    setItems(updatedItems);
  }

const deletedata=(index)=>{
    const updatedItems = [...items];
    const item=updatedItems.filter(item=> item.name !== updatedItems[index].name)
    setItems(item);


}

const print=()=>{
    setItems([]);
    const billContent = document.getElementById("bill").innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = billContent;

    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload()
}
return (
    <div className='w-screen h-screen border-8 border-blue-800 flex flex-row'>
    {/* selector button */}
    <div className='w-1/4 h-full flex flex-col gap-5 bg-blue-200 '>
      <div className='w-full h-1/4 border-b-8  border-blue-800 '>
      <a href='/'><button className='w-1/3  h-8  font-bold rounded-lg ' ><img src='/src/assets/exit.png' className='w-10 h-10 ms-3' /></button></a>
      <button className='w-1/3  h-8  font-bold rounded-lg ms-10 ' onClick={print}><img src='/src/assets/print.png' className='w-11 h-15 ms-20 mt-5' /></button>
       <a href='/menu'><button className='w-3/4 h-10  bg-[url("/src/assets//menu.jpg")] bg-cover text-black text-2xl font-bold rounded-lg  ms-10 mt-6'>Add Menu</button></a>
       </div>
       <button className='w-full h-10 bg-yellow-600 text-black text-2xl font-bold rounded-lg'  onClick={all} >All</button>

       <button className='w-full h-10 bg-red-900 text-white text-2xl font-bold rounded-lg' onClick={vegmain}>Veg-main</button>
       <button className='w-full h-10 bg-red-900 text-white text-2xl font-bold rounded-lg' onClick={vegs} >Veg-starter</button>


       <button className='w-full h-10 bg-red-600 text-white text-2xl font-bold rounded-lg' onClick={nonvegmain}  >Nonveg-main</button>
       <button className='w-full h-10 bg-red-600 text-white text-2xl font-bold rounded-lg' onClick={nonvegs}>Nonveg-starter</button>

       <button className='w-full h-10 bg-blue-800 text-white text-2xl font-bold rounded-lg'>Beverages</button>
       <button className='w-full h-10 bg-pink-600 text-white text-2xl font-bold rounded-lg'>Dessert</button>

    </div>
    {/* shown items div for billing */}

    <div className='w-2/3 h-full bg-white-400 border-8 border-blue-200 overflow-y-scroll '>

        <div className='grid grid-cols-12 gap-3 p-5'  >
        {data.map(u=>(
       <div key={u.id}  className='col-span-4  p-3 text-center rounded-xl text-white font-bold  bg-blue-800'  onClick={() => addToCart(u)} >
       <div >
       {u.name}
       </div>
       <div className='w-1/2 mt-2 ms-10 text-white rounded-xl bg-green-500'>
       Rs.{u.price}
       </div>
       </div>
       ))}
    </div>
    </div>

    {/* billing area............................................................ */}

    <div className='w-2/5 h-full border-4 border-black overflow-y-scroll relative' id="bill">
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='text-3xl font-bold'>Dark Hotel</h1>
                        <p>122, dindugal main road,madurai-52</p>
                        <p>+91 789056479</p>
                    </div>
                    <div className='border-2 border-black'></div>
                    <div className='flex flex-row justify-between items-center'>
                        <div className='w-2/4  text-xl font-bold text-center'>Name</div>
                        <div className='w-1/6 text-xl font-bold  text-center'>Qty</div>
                        <div className='w-1/5 text-xl font-bold  text-center'>Price</div>
                        <div className='w-1/5 text-xl font-bold  text-center' ></div>
                    </div>
                    {items && (
                    <div>
                    {items.map((item, index) => (
                        <div key={index} className='w-full flex flex-row justify-around items-center mt-5'>
                            <div className='w-1/2 text-center text-black'>{item.name}</div>
                            <input type="number" className='w-1/6 border-4 rounded-lg border-blue-200 text-center' min={1}   defaultValue={item.quantity} onChange={(e) => handleQtyChange(index, parseInt(e.target.value))} />
                            <div className='w-1/5  text-center amount' id="amount"   defaultValue={item.price} >Rs.{item.price * item.quantity}</div>
                            <div className='w-1/5 ps-5 text-xl font-bold  text-center' id="add" ></div>
                            <button className=' w-1/5 ps-5' id="no-print" onClick={()=>deletedata(index)}><img src="/src/assets/bin.png" className='w-10 h-10'/></button>
                        </div>
                    ))}
                    </div>
                    )}
                    <div className='flex flex-row justify-center items-center  mt-10'>

                        <button className=' w-1/5 text-xl ms-40 font-bold text-black'>Total</button>
                        <div  className=' w-1/5 text-xl me-10  font-bold text-black'> Rs.{total}</div>


                    </div>

                </div>
                {/* for notification */}
               <ToastContainer/>
    </div>
  )
}

export default Bill

