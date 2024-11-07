import React, { useEffect, useState } from 'react'
import useStore from '../store/store';
import { Link, useParams } from 'react-router-dom';
import { Star, Loader2 } from 'lucide-react';

const Category = () => {
    const {categoryId} = useParams();
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const {cat, getServices, services} = useStore();
    const thisCat = cat.find((c)=>c._id == categoryId);

    useEffect(()=>{
     fetchServices(categoryId)
    },[categoryId])

   const fetchServices = async (categoryId) => {
    try {
        await getServices(categoryId);
        // console.log(services)
    } catch (error) {
        setError(error.message);
    }finally{
        setLoading(false)
    }
   }
   

   if(error) return <div className='flex items-center justify-center min-h-[50vh]'>{error}</div>
   if(loading) return <div className='flex items-center justify-center min-h-[50vh]'><Loader2 size={50} className='animate-spin'/></div>
  return (
    <section className='px-24'>
        

        {/* Head div */}
        <div style={{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${thisCat.imageUrl})`, backgroundPosition:"center", backgroundRepeat:"no-repeat", backgroundSize:"cover",}}  className='flex flex-col justify-center px-4 py-12 rounded-lg to-lime-950'>
            <h1 className='font-bold text-center text-white sm:text-4xl'>{thisCat.name}</h1>
            <h3 className='mt-4 text-center text-white sm:text-2xl'>{thisCat.description}</h3>
            {/* <button className='px-8 py-2 mx-auto mt-8 font-semibold text-white uppercase border-2 border-white hover:bg-blue-900'>Contact Us</button> */}
             <button className="
      px-8 py-2 
      mx-auto mt-8 
      font-semibold text-white uppercase 
      border-2 border-white
      relative
      overflow-hidden
      transform
      transition-all
      duration-300
      ease-in-out
      hover:scale-105
      hover:shadow-lg
      hover:border-opacity-80
      before:absolute
      before:content-['']
      before:bg-black
      before:top-0
      before:left-0
      before:w-full
      before:h-full
      before:-translate-x-full
      before:transition-transform
      before:duration-300
      hover:before:translate-x-0
      before:-z-10
      active:scale-95
    ">
      <span className="relative z-10">Contact Us</span>
    </button>
        </div>
    <div className='flex flex-wrap gap-8 my-12'>
      { services.map((service)=>{
        return <Link key={service._id} to={`/services/${service._id}`}>
          <div className='p-4 rounded-lg hover:bg-neutral-200 max-w-[350px]'>
            <img className='w-auto h-[200px] rounded-md' src={service.imageUrl} alt={service.name} />
            <h3 className='my-4 font-sans text-2xl font-semibold'>{service.name}</h3>
            {/* Add a snippet field */}
            <h5 className='my-4 font-sans text-xl text-gray-700'>Starting From: ${service.minPrice}</h5>
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

export default Category