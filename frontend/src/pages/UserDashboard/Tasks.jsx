import React from 'react'
import Sidebar from './Sidebar'
import useStore from '../../store/store'

const Tasks = () => {
  return (
       <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-grow p-8">
         <h1 className='text-4xl'>Your Tasks</h1>
         {/* Tasks container */}
         <div className='grid gap-4 my-8 gap-y-8 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3'>
            {/* Task raised */}
            <div className="flex justify-center">
                <div className='border-[1px] rounded-lg shadow-md bg-white'>
                    <div className='overflow-hidden rounded-md'><img className='w-auto h-[200px]' src="https://www.qanmos.com/wp-content/uploads/2024/07/1685618197hitech-56458a.jpg" alt="" /></div>
                    <div className='p-4'>
                        <h3 className="mb-4 sm:text-2xl">Web Development</h3>
                        <p>Id: <span>2efgh3</span></p>
                        <p>Status: <span>Query Raised</span></p>
                        <p>Last updated: <span>5</span>hrs ago</p>
                    </div>
                </div>
            </div>
            {/* Task raised */}
            <div className="flex justify-center">
                <div className='border-[1px] rounded-lg shadow-md bg-white'>
                    <div className='overflow-hidden rounded-md'><img className='w-auto h-[200px]' src="https://ik.trn.asia/uploads/2024/01/1706240490715.png" alt="" /></div>
                    <div className='p-4'>
                        <h3 className="mb-4 sm:text-2xl">App Development</h3>
                        <p>Id: <span>2efgh3</span></p>
                        <p>Status: <span>Query Raised</span></p>
                        <p>Last updated: <span>5</span>hrs ago</p>
                    </div>
                </div>
            </div>
            {/* Task raised */}
            <div className="flex justify-center">
                <div className='border-[1px] rounded-lg shadow-md bg-white'>
                    <div className='overflow-hidden rounded-md'><img className='w-auto h-[200px]' src="https://blog.stoneriverelearning.com/wp-content/uploads/2017/06/CODEHOST111.png" alt="" /></div>
                    <div className='p-4'>
                        <h3 className="mb-4 sm:text-2xl">Hosting Setup</h3>
                        <p>Id: <span>2efgh3</span></p>
                        <p>Status: <span>Query Raised</span></p>
                        <p>Last updated: <span>5</span>hrs ago</p>
                    </div>
                </div>
            </div>
           
          
          
           
         </div>
        </main>
      </div>
  )
}

export default Tasks