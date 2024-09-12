import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import { IoSearchCircle } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import {collection,getDocs, onSnapshot} from "firebase/firestore";
import { db } from './Config/firebase';
import ContactCard from './Components/ContactCard';
import AddAndUpdate from './Components/AddAndUpdate';
import useDisclouse from './hooks/useDisclouse';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import NotFound from './Components/NotFound';

const App = () => {
  const[contacts,setContacts]=useState([]);

  const{isOpen,onClose,onOpen,user}=useDisclouse(false);
  const username=JSON.parse(localStorage.getItem('username'));
  console.log(username);
  useEffect(()=>{
    const getContacts=async ()=>{
      try{
      const contactsRef=collection(db,"contacts");
      onSnapshot(contactsRef,(snapshot)=>{
        const contactLists=snapshot.docs.map((doc)=>{
          return {
              id:doc.id,...doc.data()
          }
        });
        const filterdContacts=contactLists.filter(contact=>
          contact.username.includes(username))
  
          setContacts(filterdContacts);
        
       
      });
      
      }catch(error){
        console.log(error);
      }
        };
        getContacts();
  },[]);
 
  const filterContacts=(event)=>{
    const value=event.target.value;
    const contactsRef=collection(db,"contacts");
      onSnapshot(contactsRef,(snapshot)=>{
        const contactLists=snapshot.docs.map((doc)=>{
          return {
              id:doc.id,...doc.data()
          }
        });
       const filterdContacts=contactLists.filter(contact=>
        contact.name.toLowerCase().includes(value.toLowerCase())&& contact.username.includes(username))

        setContacts(filterdContacts);



       return filterdContacts;
      });
      
  }

  return (
    <div className='max-auto px-4 max-w-[370px]'>
        <Navbar/>
        <div>{user}</div>
        <div className='flex gap-2'>
        <div className='relative flex-grow flex items-center ml-1'>
        <IoSearchCircle className='text-white text-3xl absolute '/>
          <input 
          onChange={filterContacts} 
          className='text-white pl-9 flex-grow bg-transparent border border-white rounded-md h-[40px]' type='text'/>
        </div>
        <div>
        <IoIosAddCircle onClick={onOpen} className='text-5xl text-white gap-2 cursor-pointer '/>
        </div>
        </div>
        <div className='mt-4 gap-3 flex flex-col'>
          {
            contacts.length<=0?<NotFound/>:
            contacts.map((contact)=>(
              <ContactCard key={contact.id} contact={contact}/>
            )
             
            )
          }
        </div>
        <AddAndUpdate isOpen={isOpen} onClose={onClose}/>
        <ToastContainer 
         position='bottom-center'
        />
       
    </div>
  )
}

export default App
