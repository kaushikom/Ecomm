import React from 'react'
import useStore from '../store/store';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const Automation = () => {
     const categories = useStore((state) => state.categories);
   const thisCat = categories.find((c)=>c.name === "Automation");
   const tasks = thisCat.tasks;
  return (
    <section>
        {/* Head div */}
        <div className='flex flex-col justify-center py-12 rounded-lg bg-gradient-to-r from-amber-700 to-amber-950'>
            <h1 className='font-bold text-center text-white sm:text-4xl'>Workflow Automation</h1>
            <h3 className='mt-4 text-center text-white sm:text-2xl'>Access experts to accelerate your business.</h3>
            <button className='px-8 py-2 mx-auto mt-8 font-semibold text-white uppercase border-2 border-white hover:bg-amber-600'>Contact Us</button>
        </div>
           <div className='flex flex-wrap gap-8 my-12'>
      {tasks && tasks.map((task)=>{
        return <Link key={task.id} to={`/services/${thisCat.id}/${task.id}`}>
          <div className='p-4 rounded-lg hover:bg-neutral-200' key={task.id}>
            <img className='w-auto h-[200px] rounded-md' src={task.image} alt={task.name} />
            <h3 className='my-4 font-sans text-2xl font-semibold'>{task.name}</h3>
            <h5 className='my-4 font-sans text-xl text-gray-700'>Starting From: ${task.minPrice}</h5>
            <h6 className='flex items-center'>
              <Star/>
              <span className='mx-2 text-xl font-bold'>4.5</span>
              <span className='text-lg opacity-70'>(102)</span>
            </h6>
          </div>
        </Link>
      })}
    </div>
    </section>
  )
}

export default Automation