import React, { useState } from 'react'
import Sidebar from './Sidebar'
import useStore from '../../store/store'

const Account = () => {
  const {user} = useStore();
  const [lastName, setLastName] = useState(user.lastName);
  const [companyName, setCompanyName] = useState(user.company || '');
  const [location, setLocation] = useState(user.location || '');
  return (
     <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-grow p-8">
         <h1 className='text-4xl'>Account</h1>
         <div className="p-4 my-4 bg-white rounded-lg shadow-lg w-fit">
          <div className='flex items-center'><img className='w-auto h-[100px]' src="https://thumbs.dreamstime.com/b/user-profile-d-icon-avatar-person-button-picture-portrait-symbol-vector-neutral-gender-silhouette-circle-photo-blank-272643248.jpg" alt="" />
          <h1 className='text-xl font-bold'>Your Profile</h1></div>
          <div className='flex mt-4 items-center gap-4 justify-between pb-2 border-b-2 border-gray-200 max-w-[300px]'><h3 className='text-lg font-bold'>Name:</h3>{user.firstName}</div>
           <div className='flex mt-4 items-center gap-4 justify-between pb-2 border-b-2 border-gray-200 max-w-[300px]'><h3 className='text-lg font-bold'>Last Name:</h3> <input onChange={(e)=>setLastName(e.target.value)} value={lastName} type="text" placeholder='Enter Last Name' className='focus:outline-none text-end' /></div>
          <div className='flex mt-4 items-center gap-4 justify-between pb-2 border-b-2 border-gray-200 max-w-[300px]'><h3 className='text-lg font-bold'>Email:</h3>{user.email}</div>
          <div className='flex mt-4 items-center gap-4 justify-between pb-2 border-b-2 border-gray-200 max-w-[300px]'><h3 className='text-lg font-bold'>Company:</h3> <input value={companyName} onChange={e=>setCompanyName(e.target.value)} type="text" placeholder='Enter Company Name' className='focus:outline-none text-end' /></div>
          <div className='flex mt-4 items-center gap-4 justify-between pb-2 border-b-2 border-gray-200 max-w-[300px]'><h3 className='text-lg font-bold'>Location:</h3> <input value={location} onChange={e=>setLocation(e.target.value)} type="text" placeholder='Ex: Boston, USA' className='focus:outline-none text-end' /></div>
          <button className='w-full px-4 py-2 my-6 text-white uppercase bg-blue-600 rounded-md hover:bg-blue-500'>Update</button>
          <div className='mt-8 w-[300px]'>
            <h1 className='mb-8 text-xl font-bold'>Change Password</h1>
            <label className='mb-8 font-bold' htmlFor="old">Old Password</label>
            <br />
            <input id='old' type="text" placeholder='Enter old password' className='w-full px-4 py-2 my-4 border-2 border-gray-400 rounded-lg' />
            <br />
            <label className='mt-4 font-bold' htmlFor="new">New Password</label>
            <br />
            <input id='new' type="text" placeholder='Enter new password' className='w-full px-4 py-2 my-4 border-2 border-gray-400 rounded-lg' />
            <button className='px-4 py-2 my-6 text-white uppercase bg-blue-600 rounded-md hover:bg-blue-500'>Confirm</button>
          </div>
         </div>
        </main>
      </div>
  )
}

export default Account