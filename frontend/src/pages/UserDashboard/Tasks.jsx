import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import useStore from '../../store/store'
import DateFormatter from '../../components/DateFormatter.jsx'
import { Timeline } from 'rsuite';
import 'rsuite/Timeline/styles/index.css';
import { toast, ToastContainer } from 'react-toastify';
import { NotebookPen,CalendarCheck, Handshake,Loader, PartyPopper,  Pencil, Trash, Star,ChevronDown } from 'lucide-react';

// const TaskTimeline = ({ status }) => {
//   const [show, setShow] = useState(false);

//   // Define the stages in order
//   const stages = [
//     {
//       status: 'Query Raised',
//       label: 'Query Raised',
//       date: 'March 1, 2024',
//       icon: NotebookPen
//     },
//     {
//       status: 'Meeting Booked',
//       label: 'Meeting Booked',
//       date: 'March 2, 2024',
//       icon: CalendarCheck
//     },
//     {
//       status: 'Agreed to T&C',
//       label: 'Agreed to Terms & Conditions',
//       date: 'March 2, 2024',
//       icon: Handshake
//     },
//     {
//       status: 'Task In Progress',
//       label: 'Task In Progress',
//       date: 'March 4, 2024',
//       icon: Loader
//     },
//     {
//       status: 'Completed',
//       label: 'Task Completed',
//       date: 'March 5, 2024',
//       icon: PartyPopper
//     }
//   ];

//   const handleShowToggle = () => {
//     setShow(!show);
//   };

//   // Find the index of the current status
//   const currentStageIndex = stages.findIndex(stage => stage.status === status);

//   // Show stages up to and including the current stage
//   const visibleStages = stages.slice(0, currentStageIndex + 1);

//   return (
//     <div className="mt-4 bg-white rounded-lg shadow-sm">
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-xl font-semibold text-slate-700">Status</h1>
//         <button 
//           onClick={handleShowToggle}
//           className="p-1 transition-transform duration-200 rounded-full hover:bg-slate-100"
//         >
//           <ChevronDown 
//             className={`transform transition-transform duration-200 ${show ? 'rotate-180' : ''}`}
//           />
//         </button>
//       </div>
      
//       <div className={`overflow-hidden transition-all duration-300 ease-in-out ${show ? 'max-h-96' : 'max-h-0'}`}>
//         <div className="space-y-6">
//           {visibleStages.map((stage, index) => (
//             <div key={stage.status} className="relative flex items-center">
//               {/* Timeline line */}
//               {index !== visibleStages.length - 1 && (
//                 <div className="absolute left-5 top-10 w-0.5 h-full -ml-px bg-slate-200" />
//               )}
              
//               {/* Icon */}
//               <div className="relative flex items-center justify-center flex-shrink-0 w-10 h-10 bg-white rounded-full">
//                 <stage.icon className="w-6 h-6 text-blue-600" />
//               </div>
              
//               {/* Content */}
//               <div className="flex flex-col flex-1 ml-4">
//                 <h2 className="text-lg font-medium text-slate-900">{stage.label}</h2>
//                 {/* <p className="mt-1 text-sm text-slate-500">{stage.date}</p> */}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

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

  // Function to determine icon and text color based on stage status
  const getStageStyles = (index) => {
     if (status === 'Completed') {
    return 'text-green-600'; // If status is completed, show all stages as green
  }
    if (index < currentStageIndex) {
      return 'text-green-600'; // Completed stages
    } else if (index === currentStageIndex) {
      return 'text-orange-500'; // Current stage
    }
    return 'text-slate-400'; // Future stages
  };

  // Function to determine timeline line color
  const getLineColor = (index) => {
     if (status === 'Completed') {
    return 'bg-green-600'; // If status is completed, show all lines as green
  }
    if (index < currentStageIndex) {
      return 'bg-green-600'; // Completed stages
    } else if (index === currentStageIndex) {
      return 'bg-orange-500'; // Current stage
    }
    return 'bg-slate-200'; // Future stages
  };

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
          {stages.map((stage, index) => (
            <div key={stage.status} className="relative flex items-center">
              {/* Timeline line */}
              {index !== stages.length - 1 && (
                <div 
                  className={`absolute left-5 top-10 w-0.5 h-full -ml-px ${getLineColor(index)}`}
                />
              )}
              
              {/* Icon */}
              <div className="relative flex items-center justify-center flex-shrink-0 w-10 h-10 bg-white rounded-full">
                <stage.icon className={`w-6 h-6 ${getStageStyles(index)}`} />
              </div>
              
              {/* Content */}
              <div className="flex flex-col flex-1 ml-4">
                <h2 className={`text-lg font-medium ${getStageStyles(index)}`}>
                  {stage.label}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ReviewCard = ({ taskId }) => {
  const { getReviewByTask, addReview, updateReview, deleteReview } = useStore();
  const [review, setReview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReview();
  }, [taskId]);

  const fetchReview = async () => {
    try {
      const existingReview = await getReviewByTask(taskId);
      if (existingReview) {
        setReview(existingReview);
        setRating(existingReview.rating);
        setDescription(existingReview.description);
        console.log("Review exists: ",existingReview);
        
      }
    } catch (error) {
      toast.error('Error fetching review');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (review) {
        await updateReview(review._id, rating, description);
        toast.success('Review updated successfully');
      } else {
        await addReview(taskId, rating, description);
        toast.success('Review added successfully');
      }
      fetchReview();
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteReview(review._id);
      setReview(null);
      setRating(0);
      setDescription('');
      toast.success('Review deleted successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return <div className="mt-4 text-gray-600">Loading review...</div>;
  }

  if (isEditing || !review) {
    return (
      <form onSubmit={handleSubmit} className="mt-4">
        <h3 className="mb-4 text-lg font-semibold">
          {review ? 'Edit Review' : 'Add Review'}
        </h3>
        <div className="flex items-center mb-4 space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="focus:outline-none"
            >
              <Star
                className={`w-6 h-6 ${
                  star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md"
          placeholder="Write your review..."
          rows="3"
          required
        />
        <div className="flex space-x-2">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            {review ? 'Update' : 'Submit'}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setRating(review ? review.rating : 0);
              setDescription(review ? review.description : '');
            }}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">Your Review</h3>
        <div className="flex gap-4">
          {new Date(review.createdAt).getTime() > Date.now() - 4*60*60*1000 && (
  <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-white transition-transform bg-black border-4 border-black rounded-full hover:-translate-y-1"
          >
            <Pencil size={18}/>
          </button>
          ) }
        
          {/* <button
            onClick={handleDelete}
            className="p-2 text-white transition-transform bg-red-600 rounded-full hover:-translate-y-1"
          >
           <Trash />
          </button> */}
        </div>
      </div>
      <div className="flex mb-2 space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <p className="text-gray-700">{review.description}</p>
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
   {(task.status == 'Completed') && <ReviewCard taskId={task._id} />} 
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