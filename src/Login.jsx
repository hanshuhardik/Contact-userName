import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { Form,ErrorMessage, Field, Formik } from 'formik';
import React, { useState } from 'react'
import { db } from './Config/firebase';
import useDisclouse from './hooks/useDisclouse';
import { SiTrueup } from 'react-icons/si';
import Navbar from './Components/Navbar';
import App from './App';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
const Login = () => {
    const{user,handleUser}=useDisclouse();
    const [isLogin,setIsLogin]=useState(true);
    const SignUp=()=>{
        setIsLogin(!isLogin);
    }
    
    const addContact=async(contact)=>{
        try{
        const contactRef=collection(db,"User");
    
            await addDoc(contactRef,contact);
            console.log(contact);
        SignUp();
            

        }catch(error){
            console.log(error);
        }
    }

    const checkValid=(contact)=>{
        const contactsRef=collection(db,"User"); 
        onSnapshot(contactsRef,(snapshot)=>{
            const contactLists=snapshot.docs.map((doc)=>{
              return {
                  id:doc.id,...doc.data()
              }
            });
            
           const filterdContacts=contactLists.filter((userid)=>
            {userid.name===contact.name && userid.password===contact.password && handleUser(contact.name)}
                
            // .includes(value.toLowerCase())
            )
            localStorage.setItem('username',JSON.stringify(contact.name))
    
            
    
    
    
           
          })
          const username=JSON.parse(localStorage.getItem('username'));
          console.log(user,username);

                if(user!==""){
                    const root = createRoot(document.getElementById("root"));
                    root.render(
                      <React.StrictMode>
                        <App />
                      </React.StrictMode>
                    );
                }
    }

  return (
   <div className="max-auto px-4 max-w-[370px] justify-center">
   <Navbar/>
   
    <div className=' bg-white rounded-md p-4 '>
        
   <Formik
            className="m-3"
            initialValues={
               isLogin? {
                name:"",
                password:"",
                Email:"",
               }:
               {
                    name:"",
                    Email:"",
                    password:"",
                }
                
            }
            onSubmit={(values)=>{
                isLogin? checkValid(values):
               addContact(values);
            }}
            >
                <Form className='flex flex-col gap-2'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="name">Name</label>
                    <Field name="name" type="String" className="border h-10 "/>
                    </div>
                    {isLogin? "":
                    <div className='flex flex-col gap-1'>
                    <label htmlFor="Email">E-mail</label>
                    <Field name="Email" type="email" className="border h-10 "/>
                    </div>
                    }
               
                    

                    <div className='flex flex-col gap-1'>
                    <label htmlFor="password">Password</label>
                    <Field name="password" type="password"className="border h-10 "/>
                    </div>
                    <div className='flex justify-center'>
                    <button type='submit' className='bg-orange-500 w-32 rounded-md flex  justify-center  py-1 px-3 border'>
                        {isLogin ?"Login":"Sign_Up"} </button>

                    </div>
                    
                    <p>don't have an account? <span className='text-blue-600 cursor-pointer  font-medium' onClick={SignUp}>{isLogin?"SignUp":"Login"}</span></p>
                </Form>
            </Formik>
    </div>
    </div>
  )
}

export default Login
