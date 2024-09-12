import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react'
import { FaRegCircleUser } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from '../Config/firebase';
import AddAndUpdate from './AddAndUpdate';
import useDisclouse from '../hooks/useDisclouse';
import { toast } from 'react-toastify';

const ContactCard = ({contact}) => {
    const{isOpen,onClose,onOpen}=useDisclouse(false);

const DeleteContact=async(id)=>{
    try{

        await deleteDoc(doc(db,"contacts",id));
        toast.success("contact deleted Successfully");
    }catch(error){
console.log(error);
    }
}

  return (
    <>
    <div key={contact.id} className="bg-yellow-200 p-2 rounded-lg flex justify-between items-center">
              <div className='flex gap-1'>
              <FaRegCircleUser className="text-orange-500 text-4xl" />
                <div className='text-black'>
                <h2 className='font-medium'>{contact.name}</h2>
                <p className='text-sm'>{contact.Email}</p>
                <p className='text-sm'>{contact.phoneNo}</p>
                <p className='text-xs text-gray-400 flex justify-end'>Editied by {contact.username}</p>
                </div>
                
            </div>
            <div className='flex text-3xl'>
                <RiEditCircleLine onClick={onOpen} className='cursor-pointer'/>
                <FaTrashCan onClick={()=>DeleteContact(contact.id)} className=' cursor-pointer text-orange-500'/>
             </div>
            </div>
            <AddAndUpdate contact={contact} isUpdate isOpen={isOpen} onClose={onClose}/>
            </>
  )
}

export default ContactCard