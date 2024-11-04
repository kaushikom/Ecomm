import React, {useEffect, useState} from 'react';
import Image from '../assets/signup-image.webp'
import useStore from '../store/store';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false)
    const {isAuthenticated, forgotPassword, checkAuth} = useStore();
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        checkAuth()
    },[])
    if(isAuthenticated){
        navigate('/');
    }
    const handleSubmit = async(e) => {
        setLoading(true)
        e.preventDefault();
        if(!email){
            toast.error("Please enter email");
            setLoading(false)
            return
        }
        await forgotPassword(email);
        setIsSubmitted(true)
        setLoading(false)
    }
   return (
    <div className="flex sm:h-[60vh] bg-gray-100">
      {/* Left side with image and text */}
      <div className="relative hidden overflow-hidden text-white bg-red-700 rounded-lg lg:flex lg:w-1/2">
        <div className="absolute inset-0">
          <img 
            src={Image}
            alt="Woman working on laptop" 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-red-700 opacity-70"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center p-12">
          <h1 className="mb-6 text-4xl font-bold">Success starts here</h1>
          <ul className="space-y-4">
            <li className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Over 700 categories
            </li>
            <li className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Quality work done faster
            </li>
            <li className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Access to talent and businesses across the globe
            </li>
          </ul>
        </div>
      </div>

      {/* Right side with sign-up form */}
      <div className="flex items-center justify-center w-full p-12 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
         
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
              Forgot Password
            </h2>
            {!isSubmitted ? (
                <div>
                    <p className="mt-2 text-sm text-center text-gray-600">
             Enter your email address and we will send you a link to reset your password.
            </p>
         
          <div className="mt-8 space-y-6">
              <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
      <input className='px-4 py-2 text-xl rounded-md shadow-sm border-gray-200 border-[1px] focus:outline-red-800'
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
      />
      
      <button className={`${loading ? 'cursor-not-allowed' : ''} py-2 text-white uppercase bg-red-800 rounded-md hover:bg-red-700`} type="submit">Send Reset Link</button>
    </form>

          </div>
                </div>
            ) : (
                <div className='flex flex-col'>
                      <p className="mt-2 text-sm text-center text-gray-600">
           If an account exists for {email}, you will receive a password reset link shortly.
            </p>
            <button onClick={()=>{navigate("/login")}} className={`py-2 my-4 text-white uppercase bg-red-800 rounded-md hover:bg-red-700`} type="submit">Back To Login</button>
                </div>
            )}
            

          
        </div>
      </div>
      <ToastContainer
      position='top-center'
      autoClose={2000}
      hideProgressBar={false}
      theme='dark'
      />
    </div>
  
  );
}

export default ForgotPassword