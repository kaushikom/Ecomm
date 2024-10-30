import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import useStore from '../../store/store'
import DateFormatter from '../../components/DateFormatter.jsx'
import { Timeline } from 'rsuite';
import 'rsuite/Timeline/styles/index.css';
import { toast, ToastContainer } from 'react-toastify';
import { NotebookPen,CalendarCheck, Handshake,Loader, PartyPopper, Search,ChevronDown } from 'lucide-react';

const TaskTimeline = ({ status }) => {
  const [show, setShow] = useState(false);

  // Define the stages in order
  const stages = [
    {
      status: 'Query Raised',
      label: 'Query Raised',
      date: 'March 1, 2024',
      icon: NotebookPen
    },
    {
      status: 'Meeting Booked',
      label: 'Meeting Booked',
      date: 'March 2, 2024',
      icon: CalendarCheck
    },
    {
      status: 'Agreed to T&C',
      label: 'Agreed to Terms & Conditions',
      date: 'March 2, 2024',
      icon: Handshake
    },
    {
      status: 'Task In Progress',
      label: 'Task In Progress',
      date: 'March 4, 2024',
      icon: Loader
    },
    {
      status: 'Completed',
      label: 'Task Completed',
      date: 'March 5, 2024',
      icon: PartyPopper
    }
  ];

  const handleShowToggle = () => {
    setShow(!show);
  };

  // Find the index of the current status
  const currentStageIndex = stages.findIndex(stage => stage.status === status);

  // Show stages up to and including the current stage
  const visibleStages = stages.slice(0, currentStageIndex + 1);

  return (
    <div className="mt-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-slate-700">Status</h1>
        <button 
          onClick={handleShowToggle}
          className="p-1 transition-transform duration-200 rounded-full hover:bg-slate-100"
        >
          <ChevronDown 
            className={`transform transition-transform duration-200 ${show ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
      
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${show ? 'max-h-96' : 'max-h-0'}`}>
        <div className="space-y-6">
          {visibleStages.map((stage, index) => (
            <div key={stage.status} className="relative flex items-center">
              {/* Timeline line */}
              {index !== visibleStages.length - 1 && (
                <div className="absolute left-5 top-10 w-0.5 h-full -ml-px bg-slate-200" />
              )}
              
              {/* Icon */}
              <div className="relative flex items-center justify-center flex-shrink-0 w-10 h-10 bg-white rounded-full">
                <stage.icon className="w-6 h-6 text-blue-600" />
              </div>
              
              {/* Content */}
              <div className="flex flex-col flex-1 ml-4">
                <h2 className="text-lg font-medium text-slate-900">{stage.label}</h2>
                {/* <p className="mt-1 text-sm text-slate-500">{stage.date}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Tasks = () => {
    const {user,getTasksByUser, tasks} = useStore();
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        fetchTasks();
    },[])
   const fetchTasks = async () => {
    try {
        await getTasksByUser(user._id);
    } catch (error) {
        toast.error(error.message);
    }finally{
        setLoading(false);
    }
   }
  return (
       <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-grow p-8">
         <h1 className='text-4xl'>Your Tasks</h1>
         {/* Tasks container */}
         {!loading && (
//  <div className='grid gap-4 my-8 gap-y-8 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3'>
 <div className='flex flex-wrap items-start gap-8 my-8'>
     {tasks.length ? (tasks.map(task=>{
            return(
<div key={task._id} style={{    background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1)), url(${task.serviceType.imageUrl})`, backdropFilter:"blur(20px)" ,backgroundPosition:"center", backgroundSize:"cover", backgroundRepeat:"no-repeat"}} className='rounded-lg  flex flex-col justify-between w-[300px] shadow-md bg-gradient-to-r from-blue-500 to-blue-700'>
            <h1 className='px-4 my-4 text-2xl font-bold text-center text-white'>{task.serviceType.name}</h1>
        {/* Details subcard */}
        <div className='w-full p-4 bg-white rounded-lg'>
          <p>{task.message}</p>
          {/* Current Status */}
          <div className='mt-4 font-semibold'>Status : <span className='font-normal'>{task.status}</span></div>
         <div className='mt-4'>
  <span className='font-semibold'>Query Raised:</span> <DateFormatter date={task.createdAt} />
</div>
<div className='mt-4'>
  <span className='font-semibold'>Last Updated:</span> <DateFormatter date={task.updatedAt} />
</div>
  <TaskTimeline status={task.status} />
        </div>
          </div>
            )
          })):(<div className='w-full px-4 py-2 text-xl bg-red-100 border-l-4 border-red-500'>No Tasks Found</div>)}
         </div>
         )}
        
        </main>
        <ToastContainer position='top-center' autoClose={500} hideProgressBar={true} theme='dark' />
      </div>
  )
}

export default Tasks