import React from 'react'
import Sidebar from './Sidebar'
import { Search } from 'lucide-react'

const TrackTask = () => {
  return (
<div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-grow p-8">
         <h1 className='text-4xl'>Track Tasks</h1>
         <div className='border-[1px] flex justify-between max-w-[400px] bg-white shadow-md my-4 border-gray-300 px-4 py-2 rounded-lg text-xl'><input className='bg-transparent focus:outline-none' type="text" placeholder='Enter task Id'  />
         <button className=''><Search /></button>
         </div>
         {/* Container */}
         <div>
           <div className='rounded-lg flex flex-col justify-between max-w-[400px] shadow-md bg-gradient-to-r from-blue-500 to-blue-700'>
            <h1 className='px-4 my-4 text-2xl font-semibold text-center text-white'>Web Development</h1>
        {/* Details subcard */}
        <div className='w-full p-4 bg-white rounded-lg'>
          <h3 className='my-4 text-xl font-semibold'>Id: <span className='text-gray-600'>2sdf32</span></h3>
          <a href="mailto:someone@example.com">
            <h4 className='my-2 text-lg font-semibold text-gray-600'>someone@example.com</h4>
          </a>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti corporis, culpa possimus atque ratione placeat rem deleniti ut eligendi expedita?</p>
          {/* Current Status */}
          <div className='my-4 font-semibold'>Current Status : <span>Query Raised</span></div>
          {/* Current Status */}
          <div className='my-4 font-semibold'>
            <h3>Update Status</h3>
            <select className='border-[1px] focus:outline-none border-gray-300 w-full my-4 p-2 rounded-lg' name="status" id="status">
              <option value="query">Query Raised</option>
              <option value="booked">Meeting Booked</option>
              <option value="agreed">Agreed to T&C</option>
              <option value="processing">Task In Process</option>
              <option value="completed">Completed</option>
            </select>
            <button className='w-full px-4 py-2 text-white uppercase bg-blue-600 rounded-md hover:bg-blue-400'>Update</button>
          </div>
          {/* Date */}
          <div className='mt-4 font-semibold'>Last Updated: <span className='font-normal'>March 1, 2024</span></div>

        </div>
          </div>
         </div>
        </main>
      </div>
  )
}

export default TrackTask