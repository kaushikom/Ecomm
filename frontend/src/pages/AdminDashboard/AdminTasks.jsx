import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import DateFormatter from '../../components/DateFormatter.jsx'
import useStore from '../../store/store'
import { toast, ToastContainer } from 'react-toastify';
import { Trash } from 'lucide-react';

const Filters = ()=>{
  const { getAllTasks, getTasksByStatus} = useStore();
    const fetchAllTasks = async() => {
    try {
      await getAllTasks();
    } catch (error) {
      toast.error("Error loading tasks");
    }finally{
    }
  }
  const fetchTasksByStatus = async(status) => {
    try {
      await getTasksByStatus(status);
    } catch (error) {
      toast.error("Error loading tasks");
    }finally{
    }
  }
  const handleClick = (e) => {
    console.log(e.target.innerText.trim())
    if(e.target.innerText.trim() == 'All'){
      fetchAllTasks();
    }else{
      fetchTasksByStatus(e.target.innerText.trim());
    }
  }
  return(
         <div className='flex gap-4 my-8'>
          <button onClick={handleClick} className='px-4 py-2 bg-white border-2 border-gray-300 rounded-lg shadow-md'>All</button>
          <button onClick={handleClick} className='px-4 py-2 bg-white border-2 border-gray-300 rounded-lg shadow-md'>
            Query Raised
          </button>
          <button onClick={handleClick} className='px-4 py-2 bg-white border-2 border-gray-300 rounded-lg shadow-md'>Meeting Booked</button>
          <button onClick={handleClick} className='px-4 py-2 bg-white border-2 border-gray-300 rounded-lg shadow-md'>Agreed to T&C</button>
          <button onClick={handleClick} className='px-4 py-2 bg-white border-2 border-gray-300 rounded-lg shadow-md'>Task In Progress</button>
          <button onClick={handleClick} className='px-4 py-2 bg-white border-2 border-gray-300 rounded-lg shadow-md'>Completed</button>
         </div>
  )
}
const TaskStatusForm = ({ task }) => {
  const {updateTaskStatus,getAllTasks} = useStore();
  const [status, setStatus] = useState(task.status);
  const [error, setError] = useState(null);

const fetchAllTasks = async() => {
    try {
      await getAllTasks();
    } catch (error) {
      toast.error("Error loading tasks");
      setError(error.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await updateTaskStatus(task._id, status);
     toast.success("Updated Status");
     fetchAllTasks();
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <select 
        value={status} 
        onChange={handleStatusChange}
        className='border-[1px] focus:outline-none border-gray-300 w-full my-4 p-2 rounded-lg'
        name={`status-${task.id}`}
        id={`status-${task.id}`}
      >
        <option value="Query Raised">Query Raised</option>
        <option value="Meeting Booked">Meeting Booked</option>
        <option value="Agreed to T&C">Agreed to T&C</option>
        <option value="Task In Progress">Task In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button 
        type="submit"
        className='w-full px-4 py-2 text-white uppercase bg-gray-700 rounded-md hover:bg-gray-600 disabled:bg-gray-400'
        disabled={ status === task.status}
      > Update
      </button>
    </form>
  );
};
const Task = () => {
  const {tasks , getAllTasks,deleteTask} = useStore();
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(false);

  useEffect(()=>{
    fetchAllTasks()
  },[])
  const handleDelete = async(id) => {
    if(confirm('Confirm Delete?')){

      try {
        await deleteTask(id);
        toast.success("Deleted");
        await fetchAllTasks();
      } catch (error) {
        toast.error(error.message);
      }
    }
  }
  const fetchAllTasks = async() => {
    try {
      await getAllTasks();
    } catch (error) {
      toast.error("Error loading tasks");
      setError(error.message);
    }finally{
      setLoading(false);
    }
  }



  return (
    <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        {loading ? (<div></div>) :  (
           <main className="flex-grow p-8">
         <h1 className='text-4xl'>Tasks</h1>
       <Filters setLoading={setLoading}/>
         {/* Container */}
         <div className='flex flex-wrap gap-12 my-4'>
          {/* Card */}
          {tasks.length ? (tasks.map(task=>{
            return(
<div key={task._id} style={{    background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1)), url(${task.serviceType.imageUrl})`, backdropFilter:"blur(20px)" ,backgroundPosition:"center", backgroundSize:"cover", backgroundRepeat:"no-repeat"}} className='rounded-lg  flex flex-col justify-between max-w-[400px] shadow-md bg-gradient-to-r from-blue-500 to-blue-700'>
            <h1 className='px-4 my-4 text-2xl font-bold text-center text-white'>{task.serviceType.name}</h1>
        {/* Details subcard */}
        <div className='w-full p-4 bg-white rounded-lg'>
          <h3 className='flex items-center justify-between my-4 text-xl font-semibold'>{task.owner.firstName}<button className='p-3 text-white transition-all bg-red-500 rounded-full shadow-md shadow-gray-400 hover:-translate-y-1 hover:bg-red-700' onClick={()=>{ handleDelete(task._id)}}><Trash size={20}/></button></h3>
          <p className='font-bold'>Id: <span className='ml-2 text-sm font-medium'>{task._id}</span></p>
          <a href={`mailto:${task.owner.email}`}>
            <h4 className='my-2 text-lg font-semibold text-gray-600'>{task.owner.email}</h4>
          </a>
          <p>{task.message}</p>
          {/* Current Status */}
          <div className='mt-4 font-semibold'>Status : <span>{task.status}</span></div>
           <TaskStatusForm task={task} />
         <div className='mt-4'>
  <span className='font-semibold'>Query Raised:</span> <DateFormatter date={task.createdAt} />
</div>
<div className='mt-4'>
  <span className='font-semibold'>Last Updated:</span> <DateFormatter date={task.updatedAt} />
</div>

        </div>
          </div>
            )
          })):(<div className='w-full px-4 py-2 text-xl bg-red-100 border-l-4 border-red-500'>No Tasks Found</div>)}
          
         </div>
        </main>
        )}
       
        <ToastContainer position='top-center' autoClose={500} hideProgressBar={true} theme='dark' />
      </div>
  )
}

export default Task