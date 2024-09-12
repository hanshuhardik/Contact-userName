import React from 'react'
import { RiContactsBook2Fill } from "react-icons/ri";

const Navbar = () => {
  return (
    <div className='h-[68px] text-xl font-medium gap-2 bg-white my-4 rounded-lg flex items-center justify-center'>
            <RiContactsBook2Fill className='text-green-800 text-3xl'/>
            
            <h1 className='font-bold'>
                <span className='text-orange-600 '>Fire</span>
                <span className='text-yellow-400'>base </span> 
                <span className='text-green-800'>Contact </span>
                <span className='text-green-800'>App</span>
             </h1>
       
    </div>
  )
}

export default Navbar