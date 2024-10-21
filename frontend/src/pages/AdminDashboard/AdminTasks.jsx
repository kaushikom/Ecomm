import React from 'react'
import Sidebar from './Sidebar'

const Task = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-grow p-8">
         <h1 className='text-4xl'>Tasks</h1>
         {/* Filters */}
         <div className='flex gap-4 my-8'>
          <button className='px-4 py-2 bg-white border-2 border-gray-300 rounded-lg shadow-md'>All</button>
          <button className='px-4 py-2 bg-white border-2 border-gray-300 rounded-lg shadow-md'>
            Query Raised
          </button>
          <button className='px-4 py-2 bg-white border-2 border-gray-300 rounded-lg shadow-md'>Meeting Booked</button>
          <button className='px-4 py-2 bg-white border-2 border-gray-300 rounded-lg shadow-md'>Agreed to T&C</button>
          <button className='px-4 py-2 bg-white border-2 border-gray-300 rounded-lg shadow-md'>Task In Progress</button>
          <button className='px-4 py-2 bg-white border-2 border-gray-300 rounded-lg shadow-md'>Completed</button>
         </div>
         {/* Container */}
         <div className='flex flex-wrap gap-12 my-4'>
          {/* Card */}
          <div className='rounded-lg flex flex-col justify-between max-w-[400px] shadow-md bg-gradient-to-r from-blue-500 to-blue-700'>
            <h1 className='px-4 my-4 text-2xl font-semibold text-center text-white'>Web Development</h1>
        {/* Details subcard */}
        <div className='w-full p-4 bg-white rounded-lg'>
          <h3 className='my-4 text-xl font-semibold'>Robert Downey ( <span className='text-gray-600'>2sdf32</span> )</h3>
          <a href="mailto:someone@example.com">
            <h4 className='my-2 text-lg font-semibold text-gray-600'>someone@example.com</h4>
          </a>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti corporis, culpa possimus atque ratione placeat rem deleniti ut eligendi expedita?</p>
          {/* Current Status */}
          <div className='my-4 font-semibold'>Status : <span>Query Raised</span></div>
          {/* Date */}
          <div className='mt-4'>March 1, 2024</div>

        </div>
          </div>
          {/* Card */}
          <div className='rounded-lg flex flex-col justify-between max-w-[400px] shadow-md bg-gradient-to-r from-orange-500 to-orange-700'>
            <h1 className='px-4 my-4 text-2xl font-semibold text-center text-white'>App Development</h1>
        {/* Details subcard */}
        <div className='w-full p-4 bg-white rounded-lg'>
          <h3 className='my-4 text-xl font-semibold'>Robert Downey ( <span className='text-gray-600'>2sdf32</span> )</h3>
          <a href="mailto:someone@example.com">
            <h4 className='my-2 text-lg font-semibold text-gray-600'>someone@example.com</h4>
          </a>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti corporis, culpa possimus atque ratione placeat rem deleniti ut eligendi expedita?</p>
            {/* Current Status */}
          <div className='my-4 font-semibold'>Status : <span>Meeting Booked</span></div>
          {/* Date */}
          <div className='mt-4'>March 1, 2024</div>

        </div>
          </div>
         </div>
        </main>
      </div>
  )
}

export default Task