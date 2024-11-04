import React, {useState} from 'react';
import Image from '../assets/signup-image.webp'
import useStore from '../store/store';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const { login, error, isLoggedIn } = useStore();
  const [email, setEmail] = useState('');
const navigate = useNavigate();
  const [password, setPassword] = useState('');

 const handleSubmit = async (e) => {
    e.preventDefault();
    toast.promise(login(email, password),{
        pending:"Signing In",
        success: "Logged In",
        error: {
            render({data}){
                return data.message
            }
        }
    }).then(async(res)=>{
         await delay(1500);
        if(res.type == 'admin'){
         navigate('/admin/tasks')
        }else{
          const redirectPath = localStorage.getItem('redirectAfterLogin');
  if (redirectPath) {
    localStorage.removeItem('redirectAfterLogin');
    navigate(redirectPath);
  } else{
    navigate('/')
  }
        }
    })
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
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
              Login To Your Account
            </h2>
            <p className="mt-2 text-sm text-center text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign up
              </Link>
            </p>
          </div>
          <div className="mt-8 space-y-6">
              <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
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
      <button className='py-2 text-white uppercase bg-red-800 rounded-md hover:bg-red-700' type="submit">Login</button>
    </form>

          </div>

          
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
};


export default Login;