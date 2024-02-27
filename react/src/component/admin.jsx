import React from 'react'


const Admin = () => {

    return (

    <div className='bg-[url("/f1.jpeg")] w-screen h-screen bg-cover  bg-right '>
        <div className='w-full h-full flex  justify-center gap-10 items-center'>
            <div className='w-1/2 h-full flex flex-col gap-10 justify-center items-center ms-10'>
            <h1 className='w-1/2 text-center text-white text-6xl font bold '>Dark Hotel</h1>
            <div className='w-3/4 flex gap-10 justify-center items-center'>
            <a href='/menu'><img src='/food.jpg' className='w-40 h-40 me-20'/></a>
            <a href='/bill'><img src='/food.jpg' className='w-40 h-40'/></a>
            </div>
            </div>

         <div className='w-1/2 h-full '>
            <img src='/f5.png' className='w-full h-full'/>
         </div>
        </div>

    </div>

  )
}

export default Admin
