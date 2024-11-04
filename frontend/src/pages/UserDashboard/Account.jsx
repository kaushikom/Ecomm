import React, { useState } from 'react'
import Sidebar from './Sidebar'
import useStore from '../../store/store'
import { toast, ToastContainer } from 'react-toastify';

const Account = () => {
  const {user, update,updatePwd} = useStore();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [companyName, setCompanyName] = useState(user?.company || '');
  const [location, setLocation] = useState(user?.location || '');
  const [phone,setPhone] = useState(user?.phone || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword,setNewPassword] = useState('');

  const handleDetailsUpdate = async (e) => {
  e.preventDefault();
  console.log('Before Update Call');
  try {
    console.log("Phone: ",phone)
    const result = await update(user._id, lastName, companyName, location, phone);
    console.log('Update Success:', result);
    toast.success('Updated');    
  } catch (error) {
    console.log('Update Failed:', error);
    toast.error(error.message || 'Update failed');
  }
};
const handlePwdUpdate = async (e)=>{
  e.preventDefault();
  try {
     const result = await updatePwd(user._id, oldPassword, newPassword);
    console.log('Update Success:', result);
    toast.success('Updated');  
  } catch (error) {
     console.log('Update Failed:', error);
    toast.error(error.message || 'Update failed');
  }
}

  return (
     <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-grow p-8">
         <h1 className='text-4xl'>Account</h1>
         <div className="p-4 my-4 bg-white rounded-lg shadow-lg w-fit">
          <div className='flex items-center'><img className='w-auto h-[100px]' src="https://thumbs.dreamstime.com/b/user-profile-d-icon-avatar-person-button-picture-portrait-symbol-vector-neutral-gender-silhouette-circle-photo-blank-272643248.jpg" alt="" />
          <h1 className='text-xl font-bold'>Your Profile</h1></div>
          <div className='flex mt-4 items-center gap-4 justify-between pb-2 border-b-2 border-gray-200 max-w-[300px]'><h3 className='text-lg font-bold'>Name:</h3>{firstName}</div>
           <form onSubmit={handleDetailsUpdate}>
             <div className='flex mt-4 items-center gap-4 justify-between pb-2 border-b-2 border-gray-200 max-w-[300px]'><h3 className='text-lg font-bold'>Last Name:</h3> <input onChange={(e)=>setLastName(e.target.value)} value={lastName} type="text" placeholder='Enter Last Name' className='focus:outline-none text-end' /></div>
                       <div className='flex mt-4 items-center gap-4 justify-between pb-2 border-b-2 border-gray-200 max-w-[300px]'><h3 className='text-lg font-bold'>Email:</h3>{email}</div>
                       <div className='flex mt-4 items-center gap-4 justify-between pb-2 border-b-2 border-gray-200 max-w-[300px]'><h3 className='text-lg font-bold'>Company:</h3> <input value={companyName} onChange={e=>setCompanyName(e.target.value)} type="text" placeholder='Enter Company Name' className='focus:outline-none text-end' /></div>
                       <div className='flex mt-4 items-center gap-4 justify-between pb-2 border-b-2 border-gray-200 max-w-[300px]'><h3 className='text-lg font-bold'>Location:</h3> <input value={location} onChange={e=>setLocation(e.target.value)} type="text" placeholder='Ex: Boston, USA' className='focus:outline-none text-end' /></div>
                       <div className='flex mt-4 items-center gap-4 justify-between pb-2 border-b-2 border-gray-200 max-w-[300px]'><h3 className='text-lg font-bold'>Phone:</h3> <input value={phone} onChange={e=>setPhone(e.target.value)} type="text" placeholder='Ex: +91 987654321' className='focus:outline-none text-end' /></div>
                       <button className='w-full px-4 py-2 my-6 text-white uppercase bg-blue-600 rounded-md hover:bg-blue-500'>Update</button>
           </form>
          <div className='mt-8 w-[300px]'>
            <form onSubmit={handlePwdUpdate}>
              <h1 className='mb-8 text-xl font-bold'>Change Password</h1>
              <label className='mb-8 font-bold' htmlFor="old">Old Password</label>
              <br />
              <input id='old' type="text" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} placeholder='Enter old password' className='w-full px-4 py-2 my-4 border-2 border-gray-400 rounded-lg' />
              <br />
              <label className='mt-4 font-bold' htmlFor="new">New Password</label>
              <br />
              <input id='new' type="password" placeholder='Enter new password' value={newPassword} onChange={e=>setNewPassword(e.target.value)} className='w-full px-4 py-2 my-4 border-2 border-gray-400 rounded-lg' />
              <button className='px-4 py-2 my-6 text-white uppercase bg-blue-600 rounded-md hover:bg-blue-500'>Confirm</button>
            </form>
          </div>
         </div>
        </main>
         <ToastContainer
      position='top-center'
      autoClose={1000}
      hideProgressBar={false}
      theme='dark'
      />
      </div>
  )
}

export default Account