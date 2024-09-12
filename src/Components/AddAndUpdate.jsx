import React from 'react'
import Modal from './Modal'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../Config/firebase'
import { toast } from 'react-toastify'
import * as Yup from 'yup';

const contactSchemaValidation=Yup.object().shape(
   { name:Yup.string().required("Name is required"),
    phoneNo:Yup.string().required("required number"),
}
)

const AddAndUpdate = ({isOpen,onClose,isUpdate,contact}) => {

    const updateContact=async(contact,id)=>{
        try{
            const contactRef=doc(db,"contacts",id);
            await updateDoc(contactRef,contact);
            onClose();
            toast.success("contact Updated Successfully");

        }catch(error){
            console.log(error);
        }
    }
    const addContact=async(contact)=>{
        try{
            const contactRef=collection(db,"contacts");
            await addDoc(contactRef,contact);
            onClose();
            toast.success("new contact saved Successfully");

        }catch(error){
            console.log(error);
        }
    }


  return (
    <div>
        <Modal isOpen={isOpen} onClose={onClose}>
            <Formik
            validationSchema={contactSchemaValidation}
            initialValues={
                isUpdate?{
                    name:contact.name,
                    Email:contact.Email,
                    phoneNo:contact.phoneNo,
                    username:JSON.parse(localStorage.getItem('username')),
                }:{
                    name:"",
                    Email:"",
                    phoneNo:"",
                    username:JSON.parse(localStorage.getItem('username')),
                }
                
            }
            onSubmit={(values)=>{
                console.log(values)
                isUpdate?
                updateContact(values,contact.id):
                addContact(values);
            }}
            >
                <Form className='flex flex-col gap-2'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="name">Name</label>
                    <Field name="name" type="String" className="border h-10 "/>
                    <div className='text-xs text-red-500'>
                        <ErrorMessage name="name"/>
                    </div>
                   
                    </div>
                    <div className='flex flex-col gap-1'>
                    <label htmlFor="Email">E-mail</label>
                    <Field name="Email" type="email" className="border h-10 "/>
                    <div className='text-xs text-red-500'>
                        <ErrorMessage name="Email"/>

                    </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                    <label htmlFor="phoneNo">Phone Number</label>
                    <Field name="phoneNo" type="Number"className="border h-10 "/>
                    <div className='text-xs text-red-500'>
                        <ErrorMessage name="phoneNo"/>

                    </div>
                    </div>
                    <button className='bg-orange-500 w-32 rounded-md flex self-end justify-center  py-1 px-3 border'>
                        {isUpdate ?"Update":"add"} Contact</button>
                </Form>
            </Formik>
            </Modal>
    </div>
  )
}

export default AddAndUpdate