import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useStore from '../store/store';
import { ToastContainer, toast } from 'react-toastify';

const ResetPassword = () => {
    const {token} = useParams();
    const navigate = useNavigate();
    const [password,setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const {resetPassword, isAuthenticated} = useStore()
    if(isAuthenticated){
        navigate("/")
    }
    const handleSubmit = async(e) =>{
e.preventDefault();
if(password !== cpassword){
    toast.error("Passwords do not match")
    return
}
try {
    await resetPassword(token,password)
    toast.success("Password updated successfully");
    setTimeout(()=>{
        navigate("/login")
    },2000)
} catch (error) {
    console.log(error);
    toast.error(error.message)
}
    }
  return (
    <div className='flex justify-center my-8'>
        <form onSubmit={handleSubmit} className='w-[400px] rounded-lg border-2 shadow-lg flex flex-col gap-4 border-gray-300 p-4'>
            <h1 className='text-xl font-semibold text-center'>Reset Password</h1>
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className='px-4 py-2 border-2 border-gray-200 rounded-md' placeholder='Enter new password' />
            <input value={cpassword} onChange={e=>setCPassword(e.target.value)} type="password" className='px-4 py-2 border-2 border-gray-200 rounded-md' placeholder='Confirm new password'/>
            <button className='py-2 text-white bg-red-800 rounded-md hover:bg-red-700'>Set New Password</button>
        </form>
        <ToastContainer
      position='top-center'
      autoClose={2000}
      hideProgressBar={false}
      theme='dark'
      />
    </div>
  )
}

export default ResetPassword