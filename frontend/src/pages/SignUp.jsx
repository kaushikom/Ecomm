import React, {useState} from 'react';
import { Apple, Facebook, ArrowLeft } from 'lucide-react';
import Image from '../assets/signup-image.webp'
import useStore from '../store/store';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const SignUpForm = () => {
 const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const { signup, error, isLoggedIn } = useStore();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cnfpassword, setCnfPassword] = useState('');
  const [err, setErr] = useState('');

 const handleSubmit = async (e) => {
    e.preventDefault();
    if(cnfpassword !== password){
    setErr("Please type same password in both fields")
    }
    else{
      setErr('')
      toast.promise(signup(firstName,lastName,email, password),{
          pending:"Creating Account",
          success: "Account Created",
          error: {
              render({data}){
                  return data.message
              }
          }
      }).then(async()=>{
           await delay(1500);
          navigate('/verify-email')
      })
    }
}
return(
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <input className='px-4 py-2 text-xl rounded-md shadow-sm border-gray-200 border-[1px] focus:outline-red-800'
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
      />
      <input className='px-4 py-2 text-xl rounded-md shadow-sm border-gray-200 border-[1px] focus:outline-red-800'
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
      />
      <input className='px-4 py-2 text-xl rounded-md shadow-sm border-gray-200 border-[1px] focus:outline-red-800'
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input className='px-4 py-2 text-xl rounded-md shadow-sm border-gray-200 border-[1px] focus:outline-red-800'
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input className='px-4 py-2 text-xl rounded-md shadow-sm border-gray-200 border-[1px] focus:outline-red-800'
        type="password"
        value={cnfpassword}
        onChange={(e) => setCnfPassword(e.target.value)}
        placeholder="Confirm Password"
      />
      <span className='text-sm font-semibold text-red-700'>{error || err}</span>
      <button className='py-2 text-white uppercase bg-red-800 rounded-md hover:bg-red-700' type="submit">Login</button>
       <ToastContainer
      position='top-center'
      autoClose={2000}
      hideProgressBar={false}
      theme='dark'
      />
    </form>
)
}

const SignUpComponent = () => {
  
  const [signUpFormmToggle,  setSignUpFormToggle] = useState(false);

  return (
    <div className="flex sm:min-h-[60vh] bg-gray-100">
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
              Create a new account
            </h2>
            <p className="mt-2 text-sm text-center text-gray-600">
              Already have an account?{' '}
              <Link to='/login' className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </p>
          </div>
        {!signUpFormmToggle &&(
<div className="mt-8 space-y-6">
            <button className="flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-transparent rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <img src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="Google logo" className="w-6 h-6 mr-2" />
              Continue with Google
            </button>

            <button onClick={()=>setSignUpFormToggle(true)} className="flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-transparent rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Continue with email
            </button>

            <div className="flex items-center justify-between">
              <div className="w-full border-t border-gray-300"></div>
              <div className="px-2 text-sm text-gray-500">OR</div>
              <div className="w-full border-t border-gray-300"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-transparent rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Apple className="w-5 h-5 mr-2" />
                Apple
              </button>
              <button className="flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-transparent rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Facebook className="w-5 h-5 mr-2" />
                Facebook
              </button>
            </div>
          </div>
        )}   
         {signUpFormmToggle && (
          <div className="mt-8 space-y-6">
            <button className='flex gap-2 px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800' onClick={()=>setSignUpFormToggle(false)}><ArrowLeft/>Go Back</button>
            <SignUpForm />
          </div>
        )}

          <div className="mt-8 text-xs text-gray-500">
            By joining, you agree to the Terms of Service and to occasionally receive emails from us. Please read our Privacy Policy to learn how we use your personal data.
          </div>
        </div>
      </div>
    </div>
  );
};


export default SignUpComponent;