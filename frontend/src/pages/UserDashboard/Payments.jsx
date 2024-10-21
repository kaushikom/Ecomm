import React from 'react'
import Sidebar from './Sidebar'

const Payments = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-grow p-8">
         <h1 className='text-4xl'>Payments</h1>
         {/*Paid Card */}
         <div className='p-4 border-[2px] border-emerald-400 bg-emerald-50 bg-white rounded-md shadow-md max-w-[500px] my-8'>
          {/* status badge */}
          <div className='w-[90px] text-center my-4 uppercase font-semibold px-4 py-2 text-white rounded-full  bg-gradient-to-r from-emerald-600 to-emerald-800'>Paid</div>
          <h1 className='text-xl font-semibold'>Miltestone 1</h1>
          <p className='my-4 font-semibold text-slate-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, placeat!</p>
          <button className='px-4 py-2 text-white rounded-lg bg-emerald-950 hover:bg-emerald-900'>View Details</button>
          <p className='flex items-center justify-between'>Paid on March 1, 2024<span className='text-3xl font-bold'>$250</span></p>
         </div>
         {/*Upcoming Card */}
         <div className='p-4 bg-orange-50 border-2 border-orange-400 rounded-md shadow-md max-w-[500px] my-8'>
          {/* status badge */}
          <div className='w-[120px] text-center my-4 uppercase font-semibold px-4 py-2 text-white rounded-full  bg-gradient-to-r from-orange-600 to-orange-700'>Upcoming</div>
          <h1 className='text-xl font-semibold'>Miltestone 2</h1>
          <p className='my-4 font-semibold text-slate-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, placeat!</p>
            <button className='px-4 py-2 text-white rounded-lg bg-orange-950 hover:bg-orange-900'>Pay Now</button>
          <p className='flex items-center justify-between'>Due on March 3, 2024<span className='text-3xl font-bold'>$250</span></p>
         </div>
         {/*Completed Card */}
         <div className='p-4 bg-white rounded-md shadow-md max-w-[500px] my-8'>
          {/* status badge */}
          <div className='w-[120px] text-center my-4 uppercase font-semibold px-4 py-2 text-white rounded-full  bg-gradient-to-r from-gray-600 to-gray-700'>Completed</div>
          <h1 className='text-xl font-semibold'>Miltestone 1</h1>
          <p className='my-4 font-semibold text-slate-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, placeat!</p>
          <p className='flex items-center justify-between'>Due on March 3, 2024<span className='text-3xl font-bold'>$250</span></p>
         </div>
        </main>
      </div>
  )
}

export default Payments