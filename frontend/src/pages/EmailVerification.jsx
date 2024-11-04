import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import useStore from '../store/store';

const EmailVerification = () => {
     const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const {verifyEmail} = useStore();
   const [code, setCode] = useState(["", "", "", "", "", ""]);
const inputRefs = useRef([]);
const navigate = useNavigate();
const [loading, setLoading] = useState(false);

const handleChange = (index, value) => {
    const newCode = [...code];
    // Handle pasted content
    if (value.length > 1) {
        const pastedCode = value.slice(0, 6).split("");
        for (let i = 0; i < 6; i++) {
            newCode[i] = pastedCode[i] || "";
        }
        setCode(newCode);
        // Focus on the last non-empty input
        const lastFilledIndex = newCode.findLastIndex(digit => digit !== "");
        const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
        inputRefs.current[focusIndex].focus();
    } else {
        newCode[index] = value;
        setCode(newCode);
        // Move focus to the next input field
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    }
};

const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
        inputRefs.current[index - 1].focus();
    }
};

const handleSubmit = async(e) => {  // Corrected function name
    e.preventDefault();
    const verificationCode = code.join("");
    try {
        await verifyEmail(verificationCode);
        toast.success("Email verified");
         await delay(1500);
        navigate("/");
    } catch (error) {
        toast.error(error.message)
    }
};

// Auto submit when all six digits are filled
useEffect(() => {
    if (code.every(digit => digit !== '')) {
        handleSubmit(new Event('submit'));
    }
}, [code]);

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
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
              Verify your account
            </h2>
            <p className="mt-2 text-sm text-center text-gray-600">
              Enter the OTP sent to your email address.
            </p>
          </div>
          <div className="mt-8 space-y-6">
              <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
     <div className='flex justify-between my-4'>
        {code.map((digit,index)=>{
            return (
                <input 
                key={index}
                ref={el=>(inputRefs.current[index] = el)}
                type='text'
                maxLength={6}
                value={digit}
                onChange={e=>handleChange(index,e.target.value)}
                onKeyDown={e=>handleKeyDown(index,e)}
                className='border-2 text-center font-semibold focus:outline-red-800 border-gray-200 w-[4ch] shadow-sm rounded-md p-2'
                />
            )
        })}
     </div>
      <button className='py-2 text-white uppercase bg-red-800 rounded-md hover:bg-red-700' type="submit">Verify</button>
    </form>

          </div>

          
        </div>
      </div>
      <ToastContainer
      position='top-center'
      autoClose={1500}
      hideProgressBar={false}
      theme='dark'
      />
    </div>
  
  );
}

export default EmailVerification