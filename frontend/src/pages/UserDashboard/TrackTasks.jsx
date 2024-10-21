import React from 'react'
import Sidebar from './Sidebar'
import useStore from '../../store/store'
import { Timeline } from 'rsuite';
import 'rsuite/Timeline/styles/index.css';
import { NotebookPen,CalendarCheck, Handshake,Loader, PartyPopper, Search } from 'lucide-react';

const TrackTasks = () => {
    const { categories } = useStore();

  return (
    <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-grow p-8">
         <h1 className='text-4xl'>Track your tasks</h1>
          <div className='border-[1px] flex justify-between max-w-[400px] bg-white shadow-md my-4 border-gray-300 px-4 py-2 rounded-lg text-xl'><input className='bg-transparent focus:outline-none' type="text" placeholder='Enter task Id'  />
         <button className=''><Search /></button>
         </div>
             {/* Task raised */}
            <div className="flex justify-start mt-4">
                <div className='border-[1px] rounded-lg shadow-md bg-white'>
                    <div className='overflow-hidden rounded-md'><img className='w-auto h-[200px]' src="https://www.qanmos.com/wp-content/uploads/2024/07/1685618197hitech-56458a.jpg" alt="" /></div>
                    <div className='p-4'>
                        <h3 className="mb-4 sm:text-2xl">Web Development</h3>
                        <p>Id: <span>2efgh3</span></p>
                        <p>Last updated: <span>5</span>hrs ago</p>
                    </div>
                </div>
            </div>
         {/* Timeline */}
 <div className='p-4 mt-8'>
  <h1 className='mb-4 text-xl font-semibold text-slate-700'>Status</h1>
   <Timeline>
      <Timeline.Item dot={<NotebookPen size={40} style={{transform:"translateX(-13px)",padding:"0.5em",borderRadius:"10px", backgroundColor:"white"}}/>}>
     <div className='mb-4 ml-4'>
      <h1 className='text-xl font-semibold'>March 1, 2024</h1>
      <p className='text-slate-700'>Query Raised</p>
     </div>
      </Timeline.Item>
      <Timeline.Item dot={<CalendarCheck size={40} style={{transform:"translateX(-13px)",padding:"0.5em",borderRadius:"10px", backgroundColor:"white"}}/>}>
     <div className='mb-4 ml-4'>
      <h1 className='text-xl font-semibold'>March 2, 2024</h1>
      <p className='text-slate-700'>Meeting booked</p>
     </div>
      </Timeline.Item>
      <Timeline.Item dot={<Handshake size={40} style={{transform:"translateX(-13px)",padding:"0.5em",borderRadius:"10px", backgroundColor:"white"}}/>}>
     <div className='mb-4 ml-4'>
      <h1 className='text-xl font-semibold'>March 2, 2024</h1>
      <p className='text-slate-700'>Agreed to Terms & Conditiions</p>
     </div>
      </Timeline.Item>
      <Timeline.Item dot={<Loader size={40} style={{transform:"translateX(-13px)",padding:"0.5em",borderRadius:"10px", backgroundColor:"white"}}/>}>
     <div className='mb-4 ml-4'>
      <h1 className='text-xl font-semibold'>March 4, 2024</h1>
      <p className='text-slate-700'>Task In Progress</p>
     </div>
      </Timeline.Item>
      <Timeline.Item dot={<PartyPopper size={40} style={{transform:"translateX(-13px)",padding:"0.5em",borderRadius:"10px", backgroundColor:"white"}}/>}>
     <div className='mb-4 ml-4'>
      <h1 className='text-xl font-semibold'>March 5, 2024</h1>
      <p className='text-slate-700'>Task Completed</p>
     </div>
      </Timeline.Item>
    </Timeline>
 </div>
      
        </main>
      </div>
  )
}

export default TrackTasks

